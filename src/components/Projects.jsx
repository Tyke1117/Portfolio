import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projectsData = [
  // Mobile Apps
  {
    id: 'm1',
    category: 'mobile',
    title: 'TalkFlow',
    description: 'A real-time messaging app built using Firebase, allowing users to send and receive messages instantly. Focused on clean UI, smooth interactions, and a simple user experience.',
    techStack: ['React Native', 'Firebase', 'Redux'],
    image: 'src/assets/TalkFlow.jpg', // Placeholder
    github: '#',
    demo: '#'
  },
  {
    id: 'm2',
    category: 'mobile',
    title: 'Essence N Elegance',
    description: 'A modern shopping app for watches and perfumes featuring product browsing and a clean checkout flow. Designed with a focus on UI clarity and smooth navigation.',
    techStack: ['React Native', 'Node.js', 'MongoDB'],
    image: 'src/assets/EssenceNElegance.jpg',
    github: '#',
    demo: '#'
  },
  {
    id: 'm3',
    category: 'mobile',
    title: 'Quirk',
    description: 'A news application that displays the latest articles across different categories. Focused on readability, clean layout, and easy navigation.',
    techStack: ['React Native', 'Google Maps API', 'Express'],
    image: 'src/assets/quirk.jpg',
    github: '#',
    demo: '#'
  },
  
  // Web Apps
  {
    id: 'w1',
    category: 'web',
    title: 'Beauty Parlour Platform',
    description: 'Elegant landing page and booking system for a premium beauty parlour, engineered with responsive design and fast load times.',
    techStack: ['React.js', 'Tailwind CSS'],
    image: 'src/assets/DazzleAura.jpg',
    github: '#',
    demo: '#'
  },
  
  // AI Projects
  {
    id: 'a1',
    category: 'ai',
    title: 'Vehicle Market Value Predictor',
    description: 'Applied Machine Learning model using Scikit-Learn to estimate car prices based on multiple features, deployed with a web interface.',
    techStack: ['Python', 'Scikit-Learn', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop',
    github: '#',
    demo: '#'
  },
  {
    id: 'a2',
    category: 'ai',
    title: 'Real Estate Price Estimation',
    description: 'Predictive modeling solution analyzing housing data to forecast property values, optimizing feature engineering for high accuracy.',
    techStack: ['Python', 'Regression Models'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    github: '#',
    demo: '#'
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('mobile');

  const filteredProjects = projectsData.filter(project => project.category === activeTab);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobile')}
          >
            Mobile Apps
          </button>
          <button 
            className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => setActiveTab('web')}
          >
            Web Apps
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            AI / ML
          </button>
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card glass"
              >
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub Repository">
                        <Github size={20} />
                      </a>
                      <a href={project.demo} target="_blank" rel="noreferrer" className="icon-link" aria-label="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="tech-stack">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
