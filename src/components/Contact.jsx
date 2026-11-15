import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { Mail, ArrowRight, ArrowUpRight, ArrowUp } from 'lucide-react';
import './Contact.css';

const navLinks = [
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Achievements', to: 'achievements' },
  { name: 'Certifications', to: 'certificates' },
  { name: 'Contact', to: 'contact' },
];

const Contact = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const currentYear = new Date().getFullYear();

  // Camera pullback transition as visitor scrolls into footer
  const { scrollYProgress } = useScroll();
  const footerScale = useTransform(scrollYProgress, [0.85, 1], [0.96, 1]);
  const footerY = useTransform(scrollYProgress, [0.85, 1], [40, 0]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:chudasamapari1109@gmail.com?subject=Portfolio%20Connection&body=Hello%20Pari,%0D%0A%0D%0AMy%20email%20is:%20${encodeURIComponent(
      newsletterEmail
    )}%0D%0A%0D%0AI%20would%20like%20to%20connect%20with%20you.`;
    window.location.href = mailtoUrl;
  };

  return (
    <footer id="contact" className="contact-footer-scene">
      <div className="contact-footer-grain" />

      <motion.div
        className="contact-footer-inner"
        style={{
          scale: footerScale,
          y: footerY,
        }}
      >
        {/* OVERSIZED TOP HEADLINE WITH MASK REVEAL */}
        <div className="contact-headline-wrap">
          <motion.h2
            className="contact-giant-headline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            LET'S BUILD
            <br />
            SOMETHING.
          </motion.h2>
        </div>

        {/* CINEMATIC ANIME ARTWORK BANNER (IN PLACE OF CAR) */}
        <motion.div
          className="contact-visual-banner"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/images/anime-cyberpunk.jpg"
            alt="Cinematic Anime Artwork"
            className="contact-banner-img"
            loading="lazy"
          />
          <div className="contact-banner-overlay" />
          <span className="contact-banner-caption">
            PARI CHUDASAMA // GUJARAT, INDIA · 2025
          </span>
        </motion.div>

        {/* PROMINENT NEWSLETTER ACTION ROW */}
        <motion.div
          className="contact-newsletter-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="contact-newsletter-row">
            <motion.h3
              className="contact-newsletter-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              NEWSLETTER
            </motion.h3>

            <form
              className="contact-newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                required
                className="contact-newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                className="contact-newsletter-submit"
                aria-label="Send direct email"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </motion.div>

        {/* EDITORIAL 3-COLUMN INFORMATION GRID */}
        <div className="contact-columns-grid">
          {/* COLUMN 1: REACH OUT */}
          <motion.div
            className="contact-col"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <span className="contact-col-header">REACH OUT</span>
            <div className="contact-reach-block">
              <a
                href="mailto:chudasamapari1109@gmail.com"
                className="contact-email-link"
                title="Send direct email"
              >
                chudasamapari1109@gmail.com
              </a>
              <a
                href="mailto:chudasamapari1109@gmail.com"
                className="contact-action-btn"
              >
                <span>Start Conversation</span>
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: FIND ME */}
          <motion.div
            className="contact-col"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            <span className="contact-col-header">FIND ME</span>
            <div className="contact-social-list">
              <a
                href="https://www.linkedin.com/in/pari-chudasama-6622b2342"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/Tyke1117"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span>GitHub</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:chudasamapari05@gmail.com"
                className="contact-social-link"
              >
                <span>Secondary Mail</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* COLUMN 3: NAVIGATION */}
          <motion.div
            className="contact-col"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            <span className="contact-col-header">NAVIGATION</span>
            <div className="contact-nav-list">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={750}
                  offset={-70}
                  className="contact-nav-item"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className="contact-footer-bar">
          <p className="contact-copyright-text">
            © {currentYear} PARI CHUDASAMA. ALL RIGHTS RESERVED. // CINEMATIC GTA
            EDITORIAL
          </p>
          <Link
            to="hero"
            smooth={true}
            duration={850}
            className="contact-back-top-btn"
          >
            <span>TOP</span>
            <ArrowUp size={14} />
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};

export default Contact;
