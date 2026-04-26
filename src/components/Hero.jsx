import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, FileText } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Student Developer • Building Real Apps
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hi, I'm Pari. <br />
            <span className="gradient-text">I turn ideas into apps</span> <br />
            and keep improving with every build.
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
          I love building mobile and web apps.
          Right now, I’m exploring new technologies like AI and constantly leveling up by creating real-world projects.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="projects" smooth={true} duration={500} offset={-70} className="btn btn-primary">
              See My Work <ArrowRight size={18} />
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-70} className="btn btn-secondary">
              Let’s Connect<FileText size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
    </section>
  );
};

export default Hero;
