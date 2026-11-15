import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';
import './CinematicIntro.css';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvas3dRef = useRef(null);
  const canvas2dRef = useRef(null);
  const flashRef = useRef(null);

  const [hudText, setHudText] = useState('ACT 01 // CHAMBER LOADED');
  const [hudMeta, setHudMeta] = useState('CALIBER 7.62mm · FLIPACLIP VFX');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    const canvas3d = canvas3dRef.current;
    const canvas2d = canvas2dRef.current;
    if (!container || !canvas3d || !canvas2d) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // Set 2D canvas resolution
    canvas2d.width = width;
    canvas2d.height = height;
    const ctx = canvas2d.getContext('2d');

    // -----------------------------------------------------------
    // THREE.JS SETUP: ACT 1 CHAMBER BULLET
    // -----------------------------------------------------------
    let scene, camera, renderer;
    let bulletGroup;
    let reqId;

    const hasWebGL = isWebGLAvailable();
    if (hasWebGL) {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas3d,
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.8));

      // LIGHTING SETUP
      const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambLight);

      const keyLight = new THREE.DirectionalLight(0xffeedd, 2.4);
      keyLight.position.set(12, 16, 22);
      scene.add(keyLight);

      const redRimLight = new THREE.PointLight(0xf23838, 4.5, 60);
      redRimLight.position.set(-10, 6, 8);
      scene.add(redRimLight);

      // =========================================================
      // ACT 1 METALLIC BULLET IN CHAMBER
      // =========================================================
      bulletGroup = new THREE.Group();

      const casingMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.88,
        roughness: 0.22,
      });

      const slugMat = new THREE.MeshStandardMaterial({
        color: 0xc86432,
        metalness: 0.82,
        roughness: 0.28,
      });

      // Cartridge Casing
      const casingGeo = new THREE.CylinderGeometry(0.85, 0.85, 3.2, 32);
      const casingMesh = new THREE.Mesh(casingGeo, casingMat);
      casingMesh.rotation.z = Math.PI / 2;
      casingMesh.position.x = -1.2;
      bulletGroup.add(casingMesh);

      // Slug / Ogive Tip
      const tipGeo = new THREE.ConeGeometry(0.85, 2.2, 32);
      const tipMesh = new THREE.Mesh(tipGeo, slugMat);
      tipMesh.rotation.z = -Math.PI / 2;
      tipMesh.position.x = 1.5;
      bulletGroup.add(tipMesh);

      // Extraction rim at base
      const rimGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.35, 32);
      const rimMesh = new THREE.Mesh(rimGeo, casingMat);
      rimMesh.rotation.z = Math.PI / 2;
      rimMesh.position.x = -2.85;
      bulletGroup.add(rimMesh);

      bulletGroup.position.set(-6, 0, 0);
      bulletGroup.rotation.y = -0.3;
      scene.add(bulletGroup);
    }

    // -----------------------------------------------------------
    // 2D HAND-DRAWN FLIPACLIP VFX SPEEDLINES (ACT 1 ONLY)
    // -----------------------------------------------------------
    const vfx = {
      time: 0,
      boilSeed: 0,
      speedlines: [],
      crimsonAlpha: 1,
    };

    // Initialize 2D anime speedlines
    for (let i = 0; i < 35; i++) {
      vfx.speedlines.push({
        angle: (Math.PI * 2 * i) / 35 + (Math.random() - 0.5) * 0.2,
        len: Math.random() * 300 + 150,
        dist: Math.random() * 100 + 80,
        speed: Math.random() * 25 + 20,
        color: Math.random() > 0.4 ? '#f23838' : '#f5f0e8',
        width: Math.random() * 3 + 1,
      });
    }

    // Hand-drawn sketch jitter helper ("Boiled lines")
    const jitter = (val, max = 2.5) => {
      return val + (Math.random() - 0.5) * max;
    };

    // -----------------------------------------------------------
    // RENDER LOOP (ACT 1: 18FPS BOILING CADENCE + 3D)
    // -----------------------------------------------------------
    let lastBoilTime = 0;

    const render = (timestamp) => {
      reqId = requestAnimationFrame(render);
      vfx.time += 0.016;

      // Update boiling lines at 18fps cadence for authentic hand-drawn feel
      if (timestamp - lastBoilTime > 55) {
        vfx.boilSeed = Math.random() * 1000;
        lastBoilTime = timestamp;
      }

      // Clear 2D Canvas
      ctx.clearRect(0, 0, width, height);

      // --- FULL-SCREEN CRIMSON OPENING ---
      if (vfx.crimsonAlpha > 0.01) {
        ctx.fillStyle = `rgba(242, 56, 56, ${vfx.crimsonAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

      const cx = width / 2;
      const cy = height / 2;

      // --- 2D HAND-DRAWN SPEEDLINES ---
      ctx.lineWidth = 2;
      vfx.speedlines.forEach((sl) => {
        sl.dist += sl.speed;
        if (sl.dist > Math.max(width, height) * 0.8) {
          sl.dist = Math.random() * 60 + 40;
        }

        const x1 = cx + Math.cos(sl.angle) * sl.dist;
        const y1 = cy + Math.sin(sl.angle) * sl.dist;
        const x2 = cx + Math.cos(sl.angle) * (sl.dist + sl.len);
        const y2 = cy + Math.sin(sl.angle) * (sl.dist + sl.len);

        ctx.strokeStyle = sl.color;
        ctx.lineWidth = sl.width;
        ctx.beginPath();
        // Jittered endpoints for rough hand-drawn ink texture
        ctx.moveTo(jitter(x1, 2), jitter(y1, 2));
        ctx.lineTo(jitter(x2, 3), jitter(y2, 3));
        ctx.stroke();
      });

      // Render Three.js Scene
      if (hasWebGL && renderer && scene && camera) {
        if (bulletGroup) {
          bulletGroup.rotation.x += 0.04;
        }
        renderer.render(scene, camera);
      }
    };

    reqId = requestAnimationFrame(render);

    // -----------------------------------------------------------
    // GSAP TIMELINE: ACT 1 ONLY -> SEAMLESS REVEAL INTO PORTFOLIO
    // -----------------------------------------------------------
    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100));
      },
      onComplete: () => {
        finishIntro();
      },
    });

    // ===========================================================
    // ACT 1: THE OPENING (0.0s - 1.2s) - PRESERVED 100%
    // ===========================================================
    tl.to({}, { duration: 0.2 });

    tl.call(() => {
      setHudText('ACT 01 // CHAMBER LOADED');
      setHudMeta('CALIBER 7.62mm · FLIPACLIP VFX');
      if (bulletGroup) {
        bulletGroup.position.set(-6, 0, 0);
        bulletGroup.rotation.y = -0.3;
      }
      if (camera) {
        camera.position.set(0, 0, 14);
      }
    }, null, 0);

    // Dramatic camera zoom towards primer
    if (camera) {
      tl.to(camera.position, {
        z: 9,
        x: -2,
        duration: 1.1,
        ease: 'power2.inOut',
      }, 0.2);
    }

    // ===========================================================
    // DIRECT SMOOTH DISSOLVE INTO PORTFOLIO HERO (1.3s - 1.9s)
    // ===========================================================
    tl.to(container, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
      duration: 0.6,
      ease: 'power2.inOut',
    }, 1.3);

    // -----------------------------------------------------------
    // CLEANUP & COMPLETION HANDLERS
    // -----------------------------------------------------------
    let hasCompleted = false;

    const disposeResources = () => {
      tl.kill();
      if (reqId) cancelAnimationFrame(reqId);
      window.removeEventListener('resize', onResize);

      // Dispose Three.js objects
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
      if (renderer) {
        renderer.dispose();
      }
    };

    const finishIntro = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      disposeResources();
      if (onComplete) onComplete();
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas2d.width = width;
      canvas2d.height = height;
      if (camera && renderer) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      disposeResources();
    };
  }, [onComplete]);

  const handleSkip = () => {
    const container = containerRef.current;
    if (container) {
      gsap.to(container, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <aside
      ref={containerRef}
      className="cinematic-intro-wrapper"
      aria-label="Cinematic Portfolio Intro"
    >
      {/* 3D WEBGL STAGE */}
      <canvas ref={canvas3dRef} className="cinematic-intro-3d-canvas" />

      {/* 2D FLIPACLIP VFX CANVAS */}
      <canvas ref={canvas2dRef} className="cinematic-intro-2d-canvas" />

      {/* FLASH / IMPACT INVERSION OVERLAY */}
      <div ref={flashRef} className="cinematic-intro-flash-layer" />

      {/* VIGNETTE & GRAIN OVERLAYS */}
      <div className="cinematic-intro-vignette" />
      <div className="cinematic-intro-grain" />

      {/* HUD DISPLAY OVERLAY */}
      <header className="cinematic-intro-hud">
        <h1 className="cinematic-intro-hud-title">{hudText}</h1>
        <p className="cinematic-intro-hud-meta">{hudMeta}</p>
      </header>

      {/* SKIP INTRO BUTTON */}
      <button
        type="button"
        className="cinematic-intro-skip-btn"
        onClick={handleSkip}
        aria-label="Skip Cinematic Intro"
      >
        <span>SKIP INTRO</span>
        <ChevronRight size={16} className="cinematic-intro-skip-arrow" />
      </button>

      {/* PROGRESS BAR */}
      <div
        className="cinematic-intro-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </aside>
  );
};

export default CinematicIntro;
