import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Music, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import './Navbar.css';

const navLinks = [
  { name: 'About', to: 'about', index: '01' },
  { name: 'Skills', to: 'skills', index: '02' },
  { name: 'Projects', to: 'projects', index: '03' },
  { name: 'Experience', to: 'experience', index: '04' },
  { name: 'Achievements', to: 'achievements', index: '05' },
  { name: 'Certifications', to: 'certificates', index: '06' },
  { name: 'Contact', to: 'contact', index: '07' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Subscribe to AudioManager playback state
    const unsubscribe = audioManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  // Lock background scrolling when mobile menu overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const handleToggleMusic = (e) => {
    e.stopPropagation();
    audioManager.toggle();
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`gta-nav${scrolled ? ' gta-nav--scrolled' : ''}`}>
        <div className="gta-nav__inner">
          <Link
            to="hero"
            smooth
            duration={600}
            className="gta-nav__logo"
            onClick={handleCloseMenu}
          >
            PARI<span className="gta-nav__logo-dot">.</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="gta-nav__links">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                smooth
                duration={600}
                offset={-70}
                spy
                activeClass="gta-nav__link--active"
                className="gta-nav__link"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="gta-nav__actions">
            {/* CINEMATIC SOUNDTRACK TOGGLE BUTTON */}
            <button
              type="button"
              className={`gta-nav__audio-btn ${isPlaying ? 'gta-nav__audio-btn--active' : ''}`}
              onClick={handleToggleMusic}
              aria-label={isPlaying ? 'Mute soundtrack' : 'Play soundtrack'}
              title={isPlaying ? 'MUSIC ON · CLICK TO MUTE' : 'MUSIC OFF · CLICK TO PLAY'}
            >
              {isPlaying ? (
                <div className="gta-nav__equalizer" aria-hidden="true">
                  <span className="gta-nav__eq-bar" />
                  <span className="gta-nav__eq-bar" />
                  <span className="gta-nav__eq-bar" />
                  <span className="gta-nav__eq-bar" />
                </div>
              ) : (
                <VolumeX size={17} />
              )}
              <span className="gta-nav__audio-tooltip">
                {isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
              </span>
            </button>

            {/* HAMBURGER TRIGGER BUTTON */}
            <button
              type="button"
              className="gta-nav__burger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN CINEMATIC MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="gta-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* AMBIENT BACKGROUND GLOW */}
            <div className="gta-nav-overlay__glow" />

            {/* TOP HEADER IN OVERLAY */}
            <div className="gta-nav-overlay__header">
              <span className="gta-nav-overlay__brand">
                PARI<span className="gta-nav__logo-dot">.</span>
                <span className="gta-nav-overlay__edition"> // MISSION SELECT</span>
              </span>
              <button
                type="button"
                className="gta-nav-overlay__close-btn"
                onClick={handleCloseMenu}
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* STAGGERED MENU LINKS */}
            <div className="gta-nav-overlay__body">
              <motion.div
                className="gta-nav-overlay__list"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                  exit: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
              >
                {navLinks.map((l) => (
                  <motion.div
                    key={l.name}
                    variants={{
                      hidden: { opacity: 0, x: -35 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
                    }}
                  >
                    <Link
                      to={l.to}
                      smooth
                      duration={650}
                      offset={-70}
                      className="gta-nav-overlay__link"
                      onClick={handleCloseMenu}
                    >
                      <span className="gta-nav-overlay__index">{l.index}</span>
                      <span className="gta-nav-overlay__text">{l.name}</span>
                      <ArrowRight size={20} className="gta-nav-overlay__arrow" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* BOTTOM HUD STATUS & AUDIO TOGGLE */}
            <motion.div
              className="gta-nav-overlay__footer"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <button
                type="button"
                className={`gta-nav-overlay__audio-card ${isPlaying ? 'gta-nav-overlay__audio-card--active' : ''}`}
                onClick={handleToggleMusic}
              >
                <div className="gta-nav-overlay__audio-icon-wrap">
                  {isPlaying ? (
                    <div className="gta-nav__equalizer" aria-hidden="true">
                      <span className="gta-nav__eq-bar" />
                      <span className="gta-nav__eq-bar" />
                      <span className="gta-nav__eq-bar" />
                      <span className="gta-nav__eq-bar" />
                    </div>
                  ) : (
                    <VolumeX size={18} />
                  )}
                </div>
                <div className="gta-nav-overlay__audio-meta">
                  <span className="gta-nav-overlay__audio-label">CINEMATIC SOUNDTRACK</span>
                  <span className="gta-nav-overlay__audio-state">
                    {isPlaying ? 'ACTIVE · CLICK TO MUTE' : 'MUTED · CLICK TO PLAY'}
                  </span>
                </div>
              </button>

              <div className="gta-nav-overlay__caption">
                PARI CHUDASAMA // GUJARAT, INDIA · 2025
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
