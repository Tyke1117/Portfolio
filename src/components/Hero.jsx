import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const assetList = [
  '/images/hero-city.jpg',
  '/images/about-workspace.jpg',
  '/images/contact-car.jpg',
  '/images/anime-hero.jpg',
  '/images/TalkFlow.png',
  '/images/Essence N Elegance.png',
  '/images/Encore.png',
  '/images/Industrial.png',
];

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(10);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll-linked camera dolly & pan
  const { scrollY } = useScroll();
  const cameraDollyY = useTransform(scrollY, [0, 800], [0, 180]);
  const cameraScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  // Genuine asset preloading
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assetList.length;

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / totalAssets) * 90) + 10;
      setProgress(Math.min(currentPct, 100));

      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setLoading(false), 400);
        }, 300);
      }
    };

    assetList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    const timeout = setTimeout(() => {
      setProgress(100);
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  // Mouse camera parallax
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 24;
    const y = (clientY / innerHeight - 0.5) * 24;
    setMousePos({ x, y });
  };

  return (
    <section id="hero" className="hero-viewport" onMouseMove={handleMouseMove}>
      {/* GENUINE ASSET LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="hero-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-loader__content">
              <h2 className="hero-loader__title">PARI CHUDASAMA</h2>
              <div className="hero-loader__meta">
                <span className="hero-loader__subtitle">LOADING PARI'S WORLD</span>
                <span className="hero-loader__pct">{progress}%</span>
              </div>
              <div className="hero-loader__track">
                <div
                  className="hero-loader__bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CINEMATIC CAMERA BACKGROUND WITH PARALLAX & DOLLY */}
      <motion.div
        className="hero-bg-container"
        style={{
          y: cameraDollyY,
          scale: cameraScale,
        }}
      >
        <img
          src="/images/hero-city.jpg"
          alt="Cinematic Urban Backdrop"
          className="hero-bg-image"
          style={{
            transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0) scale(1.08)`,
          }}
        />
        <div className="hero-vignette" />
        <div className="hero-scanlines" />
      </motion.div>

      {/* TOP SCENE ID */}
      <div className="hero-scene-id">
        // SCENE 01 · LOS SANTOS EDITION
      </div>

      {/* FOREGROUND HERO CONTENT WITH CAMERA OPACITY FADE */}
      <motion.div
        className="hero-content"
        style={{ opacity: heroOpacity }}
      >
        {/* LEFT COLUMN: ROLES, NAME & EXPLORE */}
        <div className="hero-left-block">
          {/* ROLE LABELS */}
          <motion.div
            className="hero-roles"
            initial={{ opacity: 0, y: 25 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-role-item">SOFTWARE ENGINEER</span>
            <span className="hero-role-item">MOBILE DEVELOPER</span>
            <span className="hero-role-item">AI ENTHUSIAST</span>
          </motion.div>

          {/* OVERSIZED NAME WITH 3D MASK REVEAL */}
          <div className="hero-name-block">
            <div className="hero-name-mask">
              <motion.span
                className="hero-name-line"
                initial={{ y: '115%', rotateX: -15 }}
                animate={!loading ? { y: '0%', rotateX: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                PARI
              </motion.span>
            </div>
            <div className="hero-name-mask">
              <motion.span
                className="hero-name-line"
                initial={{ y: '115%', rotateX: -15 }}
                animate={!loading ? { y: '0%', rotateX: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                CHUDASAMA
              </motion.span>
            </div>
          </div>

          {/* RED ACCENT LINE DRAWING ACROSS */}
          <motion.div
            className="hero-accent-line"
            initial={{ scaleX: 0 }}
            animate={!loading ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* BOTTOM EXPLORE ACTION & LOCATION */}
          <motion.div
            className="hero-bottom-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="about"
              smooth={true}
              duration={850}
              offset={-70}
              className="hero-explore-btn"
            >
              <span>EXPLORE CHAPTERS</span>
              <div className="hero-explore-pulse">
                <div className="hero-explore-arrow">
                  <ChevronDown size={18} color="var(--red)" />
                </div>
              </div>
            </Link>

            <span className="hero-location-tag">
              // INDIA · ARCHITECTURE & MACHINE LEARNING
            </span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: ANIME / GTA CHARACTER COMPOSITION */}
        <motion.div
          className="hero-character-layer"
          initial={{ opacity: 0, x: 50 }}
          animate={!loading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          }}
        >
          <div className="hero-character-card">
            <span className="hero-character-hud">// PROTAGONIST · DEV UNIT 01</span>
            <img
              src="/images/anime-hero.jpg"
              alt="Protagonist Character Artwork"
              className="hero-character-img"
            />
            <div className="hero-character-overlay" />
            <span className="hero-character-status">STATUS · ONLINE</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
