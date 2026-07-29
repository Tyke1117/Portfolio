import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div 
          className="about-content glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-text">
            <p>
              I am a dedicated student developer with a strong focus on engineering high-performance mobile applications using React Native. Rather than just writing code, I thrive on building real-world solutions that prioritize intuitive user experiences and robust architecture.
            </p>
            <p>
              Beyond mobile development, I am actively exploring the intersection of software engineering and Applied Machine Learning. I leverage tools like Scikit-Learn to build predictive models, blending data-driven intelligence with modern application design to solve complex, practical problems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
