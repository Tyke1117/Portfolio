import React from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { useState } from "react";
import './Hero.css';

const Reveal = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
const [hovered, setHovered] = useState(false);

const x = useMotionValue(0);
const y = useMotionValue(0);


const resetPosition = () => {
  animate(x, 0, {
    type: "spring",
    stiffness: 400,
    damping: 20
  });

  animate(y, 0, {
    type: "spring",
    stiffness: 400,
    damping: 20
  });
};
  const cursorX = useMotionValue(0);
const cursorY = useMotionValue(0);

const [dragging, setDragging] = useState(false);
const handleMouseMove = (e) => {
  cursorX.set(e.clientX + 15);
  cursorY.set(e.clientY + 15);
};
const [messageIndex, setMessageIndex] = useState(0);
const [dragMessage, setDragMessage] = useState("");
  return (
    <section
        id="hero"
        className="hero-section"
        onMouseMove={handleMouseMove}
      >
      <div className="hero-wrapper">
        
        
        {/* Abstract Parallax Typography */}
        <div className="hero-title-wrapper">

          <motion.div
            className="design-canvas"

            style={{
              x,
              y
            }}

            drag

            dragElastic={0.15}

            dragMomentum={false}

  onDragStart={() => {
  setDragging(true);

  const messages = [
    "Don't change my layout bruhhh 😭",
    "Not, Again no broo 💀",
    "Bro put me back 😒",
    "I liked my old place 🫠"
  ];

  setDragMessage(messages[messageIndex]);

  setMessageIndex((prev) =>
    (prev + 1) % messages.length
  );
}}

            onDragEnd={() => {
  setDragging(false);
  resetPosition();
}}

            whileHover={{
              scale: 1.02
            }}

            whileDrag={{
              scale: 1.05,
              rotate: 2,
              cursor: "grabbing"
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 18
            }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >

            {(hovered || dragging) && (
              <div className="drag-label">
                DRAG TO MOVE ✦
              </div>
            )}

            <div className="selection-box">

              <span className="floating-tag top">
                h1 / Full Name
              </span>

              <span className="floating-tag right">
                React Native
              </span>

              <span className="floating-tag bottom">
                AI Engineer
              </span>

              <h1 className="hero-title">
                PARI<br />
                CHUDASAMA
              </h1>

              <div className="handle tl"></div>
              <div className="handle tr"></div>
              <div className="handle bl"></div>
              <div className="handle br"></div>

            </div>

          </motion.div>

        </div>

        <Reveal delay={300}>
          <p className="hero-subtitle">
            Software Engineer crafting beautiful mobile experiences. Passionate about <strong className="hero-subtitle-highlight">React Native</strong>, <strong className="hero-subtitle-highlight">AI</strong>, and data-driven solutions.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="hero-actions-wrapper">
            <a href="mailto:chudasamapari05@gmail.com" className="hero-btn-primary group">
              <div className="hero-btn-primary-hover-bg"></div>
              <span className="hero-btn-primary-content">Let's Connect <Mail size={18}/></span>
            </a>
            <a href="https://linkedin.com/in/pari-chudasama-6622b2342" target="_blank" rel="noreferrer" className="hero-btn-secondary">
              LinkedIn <Linkedin size={18}/>
            </a>
          </div>
        </Reveal>
      </div>
{dragging && (
  <motion.div
  className="drag-message"
  style={{
    left: cursorX,
    top: cursorY
  }}
>
    {dragMessage}
  </motion.div>
)}
      
    </section>
  );
};

export default Hero;
