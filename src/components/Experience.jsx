import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Layers, Rocket } from 'lucide-react';
import './Experience.css';

const timelineData = [
  {
    id: 1,
    year: '2022-2023',
    title: 'Getting Started',
    description:
      'Began my journey into development by learning programming basics, HTML, CSS, and JavaScript. Built simple static websites and understood how things work on the web.',
    icon: <BookOpen size={20} />
  },
  {
    id: 2,
    year: '2024',
    title: 'Exploring React & Frontend',
    description:
      'Started working with React.js and built interactive web applications. Learned component-based architecture and improved my understanding of UI design and user experience.',
    icon: <Code size={20} />
  },
  {
    id: 3,
    year: '2025',
    title: 'Building Mobile Apps',
    description:
      'Moved into React Native and started building real mobile apps like chat apps, e-commerce apps, and utility apps. Focused on clean UI and smooth user experience.',
    icon: <Layers size={20} />
  },
  {
    id: 4,
    year: 'Present',
    title: 'Exploring AI & Growing',
    description:
      'Currently exploring machine learning and improving my development skills by building real-world projects. Learning how to make applications smarter and more useful.',
    icon: <Rocket size={20} />
  }
];
const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Learning Journey</h2>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-marker">
                <div className="timeline-icon">{item.icon}</div>
                {index !== timelineData.length - 1 && <div className="timeline-line"></div>}
              </div>
              
              <div className="timeline-content glass">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
