import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink } from 'lucide-react';
import './Achievements.css';

const achievementsData = [
  {
    id: 'ach1',
    rank: '1ST',
    event: 'Capture The Flag',
    title: 'CTF Ghost Hunt Chapter 1',
    team: 'Team: The Anonymous Group',
    organization: 'CMPICA, CHARUSAT',
    date: 'Sep 2025',
    link: 'https://drive.google.com/file/d/1kvdBhjXgkpRSLK7q-l1S3nxEP0IfQRQH/view?usp=drive_link',
  },
  {
    id: 'ach2',
    rank: '3RD',
    event: 'Presentation Competition',
    title: 'Inter-Department PowerPoint Competition',
    team: 'Inter-Department Competition',
    organization: 'Dr. Subhash University',
    date: 'May 2023',
    link: 'https://drive.google.com/file/d/1CJPvTenMK8rf6yp1fqV_wGYDBK4NaBLd/view?usp=drive_link',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-scene">
      <div className="achievements-inner">
        <div className="achievements-header">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            AWARDS & COMPETITIONS
          </motion.span>
          <motion.h2
            className="scene-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            UNLOCKED ACHIEVEMENTS
          </motion.h2>
        </div>

        <div className="achievements-grid">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              initial={{
                opacity: 0,
                y: 50,
                rotateX: 12,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: idx * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* RANK PANEL */}
              <div className="achievement-rank-panel">
                <Trophy size={32} className="achievement-trophy-symbol" />
                <motion.span
                  className="achievement-rank-text"
                  initial={{ scale: 0.7 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.18 + 0.2 }}
                >
                  {item.rank}
                </motion.span>
                <span className="achievement-rank-caption">Position</span>
              </div>

              {/* DETAILS PANEL */}
              <div className="achievement-info-panel">
                <div>
                  <span className="achievement-event-tag">{item.event}</span>
                  <h3 className="achievement-title-text">{item.title}</h3>
                  <p className="achievement-team-text">{item.team}</p>
                </div>

                <div className="achievement-meta-footer">
                  <div>
                    <span className="achievement-org-text">
                      {item.organization}
                    </span>
                    <span className="achievement-date-text">{item.date}</span>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-link-btn"
                  >
                    <span>Certificate</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
