import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import './Achievements.css';

const achievementsData = [
  {
    id: 1,
    title: '1st Position – CTF Ghost Hunt Chapter 1',
    subtitle: '(Team: The Anonymous Group)',
    organization: 'CMPICA, CHARUSAT',
    date: 'Jan 2026',
    icon: <Trophy size={32} />
  },
  {
    id: 2,
    title: 'Participant – WebWizards Hack 2025',
    subtitle: '(Web-Based Hackathon)',
    organization: 'DEPSTAR, CHARUSAT',
    date: 'Sep 2025',
    icon: <Star size={32} />
  },
  {
    id: 3,
    title: 'Participant – GDG Introductory Event',
    subtitle: 'Google Developer Groups',
    organization: 'CHARUSAT University',
    date: 'Sep 2025',
    icon: <Star size={32} />
  },
  {
    id: 4,
    title: 'Participant – Tech-Tonic Hackathon 2025',
    subtitle: 'Hackathon',
    organization: 'CMPICA, CHARUSAT',
    date: 'Sep 2025',
    icon: <Star size={32} />
  },
  {
    id: 5,
    title: 'Participant – Project Based Learning (P2BL)',
    subtitle: 'Academic Project',
    organization: 'Dr. Subhash University',
    date: 'Feb 2025',
    icon: <Star size={32} />
  },
  {
    id: 6,
    title: '3rd Rank – Inter-Department Presentation',
    subtitle: 'PowerPoint Presentation Competition',
    organization: 'Dr. Subhash University',
    date: 'Jul 2024',
    icon: <Medal size={32} />
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <h2 className="section-title">Achievements & Competitions</h2>
        
        <div className="achievements-grid">
          {achievementsData.map((item, index) => (
            <motion.div 
              key={item.id}
              className="achievement-card glass"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="achievement-icon">
                {item.icon}
              </div>
              <div className="achievement-content">
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-subtitle">{item.subtitle}</p>
                <p className="achievement-org">{item.organization}</p>
                <span className="achievement-date">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
