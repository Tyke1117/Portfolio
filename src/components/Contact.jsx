import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-wrapper">
          <motion.div 
            className="contact-info glass"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's build something together.</h3>
            <p className="contact-desc">
              Whether you have a project in mind, are looking for a dedicated intern, or just want to chat about React Native and AI, I'm always open to new opportunities.
            </p>
            
            <div className="social-links">
              <a href="mailto:chudasamapari1109@gmail.com" className="social-item">
                <div className="social-icon"><Mail size={20} /></div>
                <span>chudasamapari1109@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/pari-chudasama-6622b2342" target="_blank" rel="noreferrer" className="social-item">
                <div className="social-icon"><Linkedin size={20} /></div>
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/Tyke1117" target="_blank" rel="noreferrer" className="social-item">
                <div className="social-icon"><Github size={20} /></div>
                <span>GitHub Portfolio</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="How can I help you?" required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
