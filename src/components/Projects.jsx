import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: 'm1',
    num: '01',
    category: 'mobile',
    categoryLabel: 'Mobile Event Platform',
    title: 'Encore – Event Discovery',
    description:
      'A mobile event platform designed for college communities to discover events, explore clubs, register for activities, and access personalized QR-based passes with organizer-side attendance management.',
    techStack: ['React Native', 'Expo', 'Firebase Cloud', 'QR Integration'],
    image: '/images/projects/encore.png',
    github: 'https://github.com/Tyke1117/Encore',
  },
  {
    id: 'm2',
    num: '02',
    category: 'mobile',
    categoryLabel: 'Mobile Application',
    title: 'TalkFlow',
    description:
      'A real-time messaging app built using Firebase, allowing users to send and receive messages instantly. Focused on clean UI, smooth interactions, and a simple user experience.',
    techStack: ['React Native', 'Firebase', 'Redux', 'Realtime DB'],
    image: '/images/projects/talkflow.png',
    github: 'https://github.com/Tyke1117/TalkFlow',
  },
  {
    id: 'm3',
    num: '03',
    category: 'mobile',
    categoryLabel: 'Mobile Concept',
    title: 'Essence N Elegance',
    description:
      'A UI-focused shopping app concept for luxury watches and perfumes. Designed product browsing screens and a visually consistent shopping experience with an emphasis on layout and navigation.',
    techStack: ['React Native', 'UI/UX Architecture', 'Vector Icons'],
    image: '/images/projects/essence.png',
    github: 'https://github.com/Tyke1117/Essense-N-Elegance',
  },
  {
    id: 'w1',
    num: '04',
    category: 'web',
    categoryLabel: 'Decision Intelligence',
    title: 'VARUNA – Maritime Intelligence',
    description:
      'A port-operations decision-support platform combining congestion forecasting and 72-hour planning to help logistics teams anticipate bottlenecks with crane optimization and Gemini Copilot.',
    techStack: ['Machine Learning', 'OR-Tools', 'Google Gemini', 'Python'],
    image: '/images/projects/varuna.png',
    github: 'https://github.com/Tyke1117/varuna',
  },
  {
    id: 'w1',
    num: '05',
    category: 'web',
    categoryLabel: 'Web Platform',
    title: 'Dazzle Aura',
    description:
      'A beauty parlour booking platform engineered with a responsive interface, appointment-scheduling logic, and booking-focused user experience.',
    techStack: ['React Native', 'Firebase', 'Mobile Web'],
    image: '/images/projects/dazzle.png',
    github: 'https://github.com/Tyke1117/Dazzle-Aura',
  },
  {
    id: 'a1',
    num: '06',
    category: 'ai',
    categoryLabel: 'Applied Computer Vision',
    title: 'Industrial Safety Detection',
    description:
      'A computer vision system using YOLO-based detection to identify workplace safety risks and unwanted activities in video footage, including worker falls, smoking, and restricted-area entry.',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision'],
    image: '/images/projects/industrial.png',
  },
  
];

const MissionCardItem = ({ project, idx }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -y * 0.02,
      rotateY: x * 0.02,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.article
      layout
      className="mission-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      {/* INDEX NUMBER */}
      <div className="mission-card-index">
        <span className="mission-card-index-text">{project.num}</span>
      </div>

      {/* DETAILS CONTENT */}
      <div className="mission-card-content">
        <div>
          <motion.span
            className="mission-card-category"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {project.categoryLabel}
          </motion.span>
          <motion.h3
            className="mission-card-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="mission-card-desc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.description}
          </motion.p>
        </div>

        <div>
          <div className="mission-card-tags">
            {project.techStack.map((tech, i) => (
              <span key={i} className="mission-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="mission-card-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mission-action-link"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Github size={16} />
                <span>Codebase</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* PROJECT POSTER IMAGE WITH THEMATIC OVERLAYS */}
      <div className="mission-card-poster-wrap">
        <motion.img
          src={project.image}
          alt={project.title}
          className="mission-card-poster-img"
          loading="lazy"
          initial={{ scale: 1.15, filter: 'brightness(0.65)' }}
          whileInView={{ scale: 1, filter: 'brightness(0.85)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="mission-poster-vignette" />
        <span className="mission-status-label">
          MISSION ACTIVE · 2025
        </span>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="projects-scene">
      <div className="projects-ambient-light" />

      <div className="projects-inner">
        {/* SECTION HEADER */}
        <div className="projects-header-block">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FEATURED PROJECTS
          </motion.span>
          <motion.h2
            className="scene-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            SELECT YOUR MISSION
          </motion.h2>
        </div>

        {/* INTERACTIVE FILTERS */}
        <div className="projects-filter-bar">
          {[
            { key: 'all', label: 'All Missions' },
            { key: 'mobile', label: 'Mobile Apps' },
            { key: 'web', label: 'Web Platforms' },
            { key: 'ai', label: 'AI & Computer Vision' },
          ].map((f) => (
            <button
              key={f.key}
              className={`projects-filter-btn${
                activeFilter === f.key ? ' projects-filter-btn--active' : ''
              }`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* MISSION LIST */}
        <div className="projects-mission-list">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <MissionCardItem key={project.id} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
