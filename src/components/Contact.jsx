import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-wrapper">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's build something together.</h3>
            <p className="contact-desc">
              Whether you have a project in mind, are looking for a dedicated intern, or just want to chat about React Native and AI, I'm always open to new opportunities.
            </p>
            
            <div className="social-cards">
              <a href="mailto:chudasamapari1109@gmail.com" className="social-card glass">
                <div className="social-icon-large"><Mail size={28} /></div>
                <div className="social-card-content">
                  <h4>Email Me</h4>
                  <span>chudasamapari1109@gmail.com</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/pari-chudasama-6622b2342" target="_blank" rel="noreferrer" className="social-card glass">
                <div className="social-icon-large"><Linkedin size={28} /></div>
                <div className="social-card-content">
                  <h4>LinkedIn</h4>
                  <span>Connect with me</span>
                </div>
              </a>
              <a href="https://github.com/Tyke1117" target="_blank" rel="noreferrer" className="social-card glass">
                <div className="social-icon-large"><Github size={28} /></div>
                <div className="social-card-content">
                  <h4>GitHub</h4>
                  <span>View my projects</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
