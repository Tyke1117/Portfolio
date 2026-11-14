import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ZoomIn, ZoomOut, RotateCcw, CheckCircle2 } from 'lucide-react';
import './Certificates.css';

const certificatesData = [
  {
    id: 'cert1',
    index: 'DOC // 01',
    title: 'Green Skills and Artificial Intelligence',
    issuer: 'Edunet Foundation / AICTE / Shell India',
    date: 'Jan 2026',
    credentialId: 'EF-AI-2026-9921',
    description: 'Comprehensive certification program covering foundational AI, green compute algorithms, carbon-aware data pipelines, and intelligent environmental sustainability practices endorsed by AICTE.',
    link: 'https://drive.google.com/file/d/1BnGPxKMWY2_o8RAaQLEIkhvRGs5CCaK-/view?usp=drive_link',
  },
  {
    id: 'cert2',
    index: 'DOC // 02',
    title: 'Prompt Engineering',
    issuer: 'Infosys Springboard',
    date: 'Sep 2023',
    credentialId: 'INF-PE-884102',
    description: 'Advanced mastery of prompt design architectures, Chain-of-Thought reasoning, few-shot generation protocols, and LLM orchestration strategies for real-world enterprise applications.',
    link: 'https://drive.google.com/file/d/13xUzEvtzYT8_oIKIdk3itTGlEEbWtEbl/view?usp=drive_link',
  },
  {
    id: 'cert3',
    index: 'DOC // 03',
    title: 'Overview of Emerging Technologies',
    issuer: 'IUCEE Foundation',
    date: 'Aug–Oct 2023',
    credentialId: 'IUCEE-ET-2023-74',
    description: 'Cross-disciplinary technical exploration of AI systems, distributed edge architecture, cloud ecosystem virtualization, and next-generation software development workflows.',
    link: 'https://drive.google.com/file/d/1nBg3Sbnwn6MDc5m0TpkJBqNth3HPrbXc/view?usp=drive_link',
  },
  {
    id: 'cert4',
    index: 'DOC // 04',
    title: 'IBM Data Science with Python: Machine Learning & Analysis',
    issuer: 'IBM via Coursera',
    date: 'Mar 2026',
    credentialId: 'IBM-DS-PY-55419',
    description: 'Professional specialization credentials focusing on data wrangling, exploratory statistical modeling, classification/regression supervised pipelines, and Scikit-Learn evaluation metrics.',
    link: 'https://drive.google.com/file/d/1ZEPDq2bXVE8A3dJX6YCJq7CpjVPP8y5w/view?usp=sharing',
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Lock background scroll when certificate modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedCert(null);
          setZoomLevel(1);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedCert]);

  const handleOpenCert = (cert, e) => {
    e.preventDefault();
    setSelectedCert(cert);
    setZoomLevel(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel((z) => Math.min(z + 0.25, 2.0));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <section id="certificates" className="certificates-scene">
      <div className="certificates-inner">
        <div className="certificates-header">
          <motion.span
            className="gta-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            VERIFIED CREDENTIALS
          </motion.span>
          <motion.h2
            className="scene-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            THE ARCHIVE
          </motion.h2>
        </div>

        <div className="certificates-grid">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              className="archive-doc-card"
              onClick={(e) => handleOpenCert(cert, e)}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="archive-doc-stamp-row">
                <div className="archive-doc-stamp">
                  <Award size={18} />
                </div>
                <span className="archive-doc-index">{cert.index}</span>
              </div>

              <div>
                <p className="archive-doc-issuer">{cert.issuer}</p>
                <h3 className="archive-doc-title">{cert.title}</h3>
              </div>

              <div className="archive-doc-meta">
                <span className="archive-doc-date">{cert.date}</span>
                <span className="archive-doc-action">
                  VIEW & ZOOM <ExternalLink size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TOUCH-FRIENDLY INTERACTIVE CERTIFICATE VIEWER MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-modal-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* TOP MODAL HUD BAR */}
              <div className="cert-modal-header">
                <div className="cert-modal-header-meta">
                  <span className="cert-modal-doc-index">{selectedCert.index}</span>
                  <span className="cert-modal-verified-badge">
                    <CheckCircle2 size={13} /> VERIFIED ARCHIVE
                  </span>
                </div>
                <div className="cert-modal-controls">
                  <button
                    type="button"
                    className="cert-modal-ctrl-btn"
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    type="button"
                    className="cert-modal-ctrl-btn"
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    type="button"
                    className="cert-modal-ctrl-btn"
                    onClick={handleZoomIn}
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    type="button"
                    className="cert-modal-close-btn"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close document viewer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* CERTIFICATE PREVIEW CONTAINER WITH ZOOM TRANSFORM */}
              <div className="cert-modal-viewport">
                <div
                  className="cert-modal-doc-sheet"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <div className="cert-sheet-watermark">CONFIDENTIAL // ARCHIVE</div>
                  <div className="cert-sheet-top-row">
                    <Award size={36} color="var(--red)" />
                    <span className="cert-sheet-id-code">{selectedCert.credentialId}</span>
                  </div>
                  <h3 className="cert-sheet-title">{selectedCert.title}</h3>
                  <div className="cert-sheet-issuer-row">
                    <span className="cert-sheet-label">CONFERRED BY:</span>
                    <span className="cert-sheet-val">{selectedCert.issuer}</span>
                  </div>
                  <div className="cert-sheet-date-row">
                    <span className="cert-sheet-label">DATE OF COMPLETION:</span>
                    <span className="cert-sheet-val">{selectedCert.date}</span>
                  </div>
                  <p className="cert-sheet-desc">{selectedCert.description}</p>

                  <div className="cert-sheet-footer">
                    <div className="cert-sheet-seal">
                      <span>VERIFIED CREDENTIAL</span>
                      <strong>ARCHIVED RECORD</strong>
                    </div>
                    <div className="cert-sheet-signatures">
                      <span>PARI CHUDASAMA // RECIPIENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="cert-modal-footer">
                <span className="cert-modal-hint">
                  Pinch or use zoom controls above for precision inspection.
                </span>
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-external-btn"
                >
                  <span>OPEN ON GOOGLE DRIVE</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
