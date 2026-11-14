import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    num: '01',
    cat: '/ Core Code',
    title: 'Programming Languages',
    items: [
      { name: 'Python', role: 'Machine Learning & Predictive Modeling', focus: 'Primary' },
      { name: 'JavaScript (ES6+)', role: 'Modern Frontend & Mobile Application Logic', focus: 'Core' },
      { name: 'Java', role: 'Object-Oriented Architecture & Mobile Core', focus: 'Applied' },
      { name: 'PHP', role: 'Backend Data Handling & Server Scripting', focus: 'Applied' },
    ],
  },
  {
    num: '02',
    cat: '/ Mobile & Web',
    title: 'Client-Side Engineering',
    items: [
      { name: 'React Native', role: 'Cross-Platform High-Performance Mobile Apps', focus: 'Specialty' },
      { name: 'React', role: 'Component-Driven Web Interfaces & SPA Systems', focus: 'Advanced' },
      { name: 'Android / iOS', role: 'Native Build Workflows, Device APIs & Testing', focus: 'Mobile' },
      { name: 'HTML5 & CSS3', role: 'Semantic Layouts, Responsive UI & Motion Styling', focus: 'Core' },
    ],
  },
  {
    num: '03',
    cat: '/ Ecosystem',
    title: 'Backend, State & AI Tools',
    items: [
      { name: 'Firebase Services', role: 'Realtime Database, Cloud Auth & Push Pipelines', focus: 'Production' },
      { name: 'Zustand & Redux', role: 'Predictable Global State Architecture', focus: 'Production' },
      { name: 'REST API Integration', role: 'Asynchronous Network Layers & Serialization', focus: 'Production' },
      { name: 'Scikit-Learn & ML', role: 'Feature Regression, Classification & Data Prep', focus: 'Applied AI' },
    ],
  },
];

const ArsenalPanelItem = ({ cat, idx }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -y * 0.035,
      rotateY: x * 0.035,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      className="arsenal-panel"
      initial={{ opacity: 0, y: 45, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      <span className="arsenal-panel-num">{cat.num}</span>

      <div>
        <div className="arsenal-panel-header">
          <span className="arsenal-panel-cat">{cat.cat}</span>
          <h3 className="arsenal-panel-title">{cat.title}</h3>
        </div>

        <div className="arsenal-items-list">
          {cat.items.map((item, itemIdx) => (
            <div key={itemIdx} className="arsenal-tech-row">
              <div className="arsenal-tech-meta">
                <span className="arsenal-tech-name">{item.name}</span>
                <span className="arsenal-tech-badge">{item.focus}</span>
              </div>
              <p className="arsenal-tech-desc">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { scrollYProgress } = useScroll();
  const cameraDepth = useTransform(scrollYProgress, [0.25, 0.5], [0.96, 1]);

  return (
    <section id="skills" className="skills-scene">
      <div className="skills-scanline-bg" />

      <motion.div
        className="skills-inner"
        style={{ scale: cameraDepth }}
      >
        <div className="skills-header">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            TECHNICAL EXPERTISE
          </motion.span>
          <motion.h2
            className="scene-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            THE ARSENAL
          </motion.h2>
        </div>

        {/* CONNECTIVE RED LASER LINE */}
        <motion.div
          className="skills-connect-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <ArsenalPanelItem key={cat.num} cat={cat} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
