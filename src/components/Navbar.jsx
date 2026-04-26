import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-container container">
        <div className="logo">
          <Link to="hero" smooth={true} duration={500} offset={-70}>
            Pari<span className="accent">.</span>
          </Link>
        </div>

        <div className="nav-links desktop-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="nav-item"
              activeClass="active"
              spy={true}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="mobile-controls">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu glass">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="mobile-nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
