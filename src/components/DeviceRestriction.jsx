import React from 'react';
import './DeviceRestriction.css';

const DeviceRestriction = () => {
  return (
    <div className="device-restriction-screen" role="alert" aria-live="polite">
      <div className="device-restriction-content">
        {/* BRAND LOGO */}
        <h1 className="device-restriction-logo">
          PARI<span className="device-restriction-dot">.</span>
        </h1>

        {/* MINIMAL FLOATING LAPTOP ILLUSTRATION */}
        <div className="device-restriction-icon-wrap" aria-hidden="true">
          <svg
            className="device-restriction-laptop-svg"
            viewBox="0 0 120 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Laptop Display Lid */}
            <rect
              x="22"
              y="10"
              width="76"
              height="50"
              rx="4"
              stroke="#e6e1d8"
              strokeWidth="2"
              fill="#0d0d0d"
            />
            {/* Screen inner glow / display area */}
            <rect
              x="26"
              y="14"
              width="68"
              height="42"
              rx="2"
              fill="#141414"
            />
            {/* Screen accent dot / line */}
            <circle cx="60" cy="33" r="3" fill="#f23838" />
            <line x1="48" y1="42" x2="72" y2="42" stroke="rgba(245, 240, 232, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Laptop Base */}
            <path
              d="M10 63C10 61.8954 10.8954 61 12 61H108C109.105 61 110 61.8954 110 63V66C110 68.2091 108.209 70 106 70H14C11.7909 70 10 68.2091 10 66V63Z"
              fill="#1c1c1c"
              stroke="#e6e1d8"
              strokeWidth="1.5"
            />
            {/* Trackpad Notch */}
            <rect
              x="52"
              y="61"
              width="16"
              height="2.5"
              rx="1"
              fill="rgba(245, 240, 232, 0.5)"
            />
          </svg>
        </div>

        {/* HEADLINE */}
        <h2 className="device-restriction-title">
          BEST VIEWED ON A LAPTOP
        </h2>

        {/* SUBTLE ANIMATED RED UNDERLINE */}
        <div className="device-restriction-underline" />

        {/* EXPLANATORY BODY TEXT */}
        <p className="device-restriction-desc">
          Please open this portfolio on a laptop or desktop for the best experience.
        </p>

        {/* RESOLUTION HINT */}
        <span className="device-restriction-badge">
          SCREEN WIDTH &gt; 1024PX REQUIRED
        </span>
      </div>
    </div>
  );
};

export default DeviceRestriction;
