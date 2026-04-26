import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Database, BrainCircuit } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: <Smartphone size={24} />,
    skills: [
      { name: 'React Native', level: 90 },
      { name: 'Expo', level: 85 },
      { name: 'Mobile UI/UX', level: 80 }
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: <Globe size={24} />,
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
    ]
  },
  {
    id: 'backend',
    title: 'Backend & BaaS',
    icon: <Database size={24} />,
    skills: [
      { name: 'Firebase', level: 70 },
      { name: 'MongoDB Atlas', level: 60 },
      { name: 'Node.js (Basic)', level: 60 }
    ]
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    icon: <BrainCircuit size={24} />,
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Scikit-Learn', level: 70 },
      { name: 'Predictive Modeling', level: 65 }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.id} className="skill-card glass" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-icon">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skill-list">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <motion.div 
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
