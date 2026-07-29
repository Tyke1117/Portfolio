import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-scroll';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Pari. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
