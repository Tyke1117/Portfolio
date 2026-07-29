import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import './Certificates.css';

const certificatesData = [
  {
    id: 1,
    title: 'Green Skills and Artificial Intelligence',
    issuer: 'Edunet Foundation / AICTE / Shell India',
    date: 'Jan 2026',
    link: 'https://drive.google.com/file/d/1BnGPxKMWY2_o8RAaQLEIkhvRGs5CCaK-/view?usp=drive_link' 
  },
  {
    id: 2,
    title: 'Building Web Applications in PHP',
    issuer: 'University of Michigan via Coursera',
    date: 'Sep 2025',
    link: 'https://drive.google.com/file/d/1SPHFol1qrEddKt-FoRFNw7yk454nwo3h/view?usp=drive_link' 
  },
  {
    id: 3,
    title: 'Java Class Library',
    issuer: 'LearnQuest via Coursera',
    date: 'Sep 2025',
    link: 'https://drive.google.com/file/d/10d4pheBH7kUXa7w139ADn36plJ8Scekj/view?usp=drive_link' 
  },
  {
    id: 4,
    title: 'Data Structures and Algorithm Analysis',
    issuer: 'Packt via Coursera',
    date: 'Sep 2025',
    link: 'https://drive.google.com/file/d/1hVVHw_Y9I1TNg0xo2_MxM-MNR0KkG_Hv/view?usp=drive_link' 
  },
  {
    id: 5,
    title: 'Android and Apple App Development',
    issuer: 'Udemy – Stone River eLearning',
    date: 'Feb 2025',
    link: 'https://drive.google.com/file/d/12y8P_OeuolJVNTm1Wejb7PdicZUkUQd0/view?usp=drive_link' 
  },
  {
    id: 6,
    title: 'Python Course for Beginners',
    issuer: 'Scaler Academy',
    date: 'Jul 2024',
    link: 'https://drive.google.com/file/d/1Ku9Fccl2sd6NUcEEQHvlM2f-da-rHobM/view?usp=drive_link' 
  },
  {
    id: 7,
    title: 'Prompt Engineering',
    issuer: 'Infosys Springboard',
    date: 'Sep 2023',
    link: 'https://drive.google.com/file/d/13xUzEvtzYT8_oIKIdk3itTGlEEbWtEbl/view?usp=drive_link' 
  },
  {
    id: 8,
    title: 'Overview of Emerging Technologies',
    issuer: 'IUCEE Foundation',
    date: 'Aug–Oct 2023',
    link: 'https://drive.google.com/file/d/1nBg3Sbnwn6MDc5m0TpkJBqNth3HPrbXc/view?usp=drive_link' 
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="certificates-grid">
          {certificatesData.map((cert, index) => (
            <motion.div 
              key={cert.id}
              className="certificate-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="cert-icon">
                <Award size={32} />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
              </div>
              <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                <span>View Credential</span>
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
