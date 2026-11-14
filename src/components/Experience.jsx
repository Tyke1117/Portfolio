import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Experience.css';

const timelineData = [
  {
    id: 'exp1',
    num: 'STAGE 01',
    period: 'Jan 2025 – Jul 2025',
    title: 'React Native Developer Intern',
    company: 'Venom Technologies',
    location: 'VV Nagar, Anand',
    description:
      'Developed and contributed to mobile application projects using React Native and Firebase. Worked with real-world software development workflows and contributed to project milestones. Received an Outstanding Final Grade of A (47/50) for performance and technical contributions.',
    badge: { label: 'Final Grade', value: 'A · 47/50' },
  },
  {
    id: 'exp2',
    num: 'STAGE 02',
    period: 'May 2026 – Jun 2026',
    title: 'Founding Engineer / React Native Intern',
    company: 'Runiverse',
    location: 'Remote',
    description:
      'Developed frontend features for a React Native mobile application. Integrated APIs, managed application state using Zustand, and built responsive UI screens with Mapbox. Supported testing, debugging, and iterative feature improvements.',
    badge: null,
  },
];

const Experience = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0.4, 0.75], ['0%', '100%']);

  return (
    <section id="experience" className="experience-scene">
      <div className="experience-grid-bg" />

      <div className="experience-inner">
        <div className="experience-header">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CAREER HISTORY
          </motion.span>
          <motion.h2
            className="scene-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            THE JOURNEY
          </motion.h2>
        </div>

        <div className="experience-timeline">
          {/* PROGRESSIVE SCROLL-CONTROLLED VERTICAL RED LINE */}
          <div className="experience-timeline-line">
            <motion.div
              style={{
                width: '100%',
                height: lineHeight,
                background: 'var(--red)',
                boxShadow: '0 0 15px var(--red-glow)',
                transition: 'height 0.1s linear',
              }}
            />
          </div>

          {timelineData.map((item, idx) => (
            <motion.div
              key={item.id}
              className="timeline-node"
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? -45 : 45,
                rotateY: idx % 2 === 0 ? 8 : -8,
              }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: idx * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* MARKER PIN WITH BEACON PULSE */}
              <motion.div
                className="timeline-marker-pin"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
              />

              {/* DATE COLUMN */}
              <div className="timeline-date-col">
                <span className="timeline-milestone-id">{item.num}</span>
                <span className="timeline-period-badge">{item.period}</span>
              </div>

              {/* CONTENT CARD */}
              <div className="timeline-content-card">
                <h3 className="timeline-role-title">{item.title}</h3>
                <p className="timeline-company-row">
                  {item.company} · {item.location}
                </p>
                <p className="timeline-desc-text">{item.description}</p>
                {item.badge && (
                  <div className="timeline-grade-badge">
                    <span className="timeline-grade-label">
                      {item.badge.label}
                    </span>
                    <span className="timeline-grade-val">
                      {item.badge.value}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
