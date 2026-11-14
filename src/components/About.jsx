import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Camera tracking on scroll
  const { scrollYProgress } = useScroll();
  const cameraTrackX = useTransform(scrollYProgress, [0.1, 0.4], [-30, 0]);
  const cameraDepth = useTransform(scrollYProgress, [0.1, 0.35], [0.95, 1]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -y * 0.04,
      rotateY: x * 0.04,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="about" className="about-scene">
      <div className="about-grid-bg" />
      <div className="about-ambient-glow" />

      <motion.div
        className="about-inner"
        style={{
          x: cameraTrackX,
          scale: cameraDepth,
        }}
      >
        {/* LEFT COLUMN: EDITORIAL NARRATIVE */}
        <div className="about-text-column">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            ABOUT PARI
          </motion.span>

          <div className="about-heading-mask">
            <motion.h2
              className="about-title"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              THE <span className="about-title-highlight">STORY</span>
            </motion.h2>
          </div>

          <motion.div
            className="about-separator-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: 'left center' }}
          />

          <motion.div
            className="about-paragraphs"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about-p">
              I am a dedicated student developer with a strong focus on engineering high-performance mobile applications using <strong>React Native</strong>. Rather than just writing code, I thrive on building real-world solutions that prioritize intuitive user experiences and robust architecture.
            </p>
            <p className="about-p">
              Beyond mobile development, I am actively exploring the intersection of software engineering and <strong>Applied Machine Learning</strong>. I leverage tools like Scikit-Learn to build predictive models, blending data-driven intelligence with modern application design to solve complex, practical problems.
            </p>
          </motion.div>

          <motion.div
            className="about-stats-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="about-stat-item">
              <span className="about-stat-number">2+</span>
              <span className="about-stat-label">Years Building</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">6+</span>
              <span className="about-stat-label">Projects Shipped</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">A</span>
              <span className="about-stat-label">Final Grade (47/50)</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: REALISTIC CINEMATIC WORKSPACE WITH SCREEN ILLUMINATION & 3D TILT */}
        <motion.div
          className="about-visual-column"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="about-image-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            }}
          >
            <span className="about-hud-tag about-hud-tag--top">
              [ REACT NATIVE · ARCHITECTURE ]
            </span>
            <img
              src="/images/about-workspace.jpg"
              alt="Cinematic Developer Workstation"
              className="about-realistic-img"
              loading="lazy"
            />
            {/* Dynamic Animated Screen Illumination */}
            <div className="about-screen-glow" />
            <div className="about-image-overlay" />
            <span className="about-hud-tag about-hud-tag--bottom">
              [ APPLIED MACHINE LEARNING ]
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
