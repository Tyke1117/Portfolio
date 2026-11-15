import React, { Component, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import CinematicCanvas from './components/canvas/CinematicCanvas';
import DeviceRestriction from './components/DeviceRestriction';
import CinematicIntro from './components/intro/CinematicIntro';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Canvas ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function App() {
  const [introActive, setIntroActive] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 1024;
    }
    return true;
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', checkScreenSize, { passive: true });
    window.addEventListener('orientationchange', checkScreenSize, { passive: true });
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);

  const handleIntroComplete = () => {
    setIntroActive(false);
  };

  return (
    <div className="app-container">
      {/* CINEMATIC INTRO: FLIPACLIP VFX × GTA × ANIME ACTION (ONCE PER PAGE LOAD) */}
      {introActive && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* RESTRICTION SCREEN FOR PHONES & TABLETS (<= 1024px) */}
      {!isDesktop ? (
        <DeviceRestriction />
      ) : (
        /* EXISTING DESKTOP PORTFOLIO (PRESERVED & UNTOUCHED) */
        <div className="desktop-only-portfolio">
          <ErrorBoundary>
            <CinematicCanvas />
          </ErrorBoundary>
          <div className="film-grain" aria-hidden="true" />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Certificates />
            <Contact />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
