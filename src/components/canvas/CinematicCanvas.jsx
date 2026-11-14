import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const CinematicCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    let scene;
    let camera;
    let geometry;
    let pMaterial;
    let pTexture;
    let reqId;
    let st;
    let isTabVisible = true;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080808, isMobile ? 0.0018 : 0.0012);

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.set(0, 0, 400);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // Disable MSAA on mobile for optimal GPU fillrate
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Adaptive pixel ratio: 1 on mobile, max 1.8 on high-DPI desktop
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.8));
      container.appendChild(renderer.domElement);

      // ADAPTIVE PARTICLES: 80 on mobile, 300 on desktop
      const particleCount = prefersReducedMotion ? 40 : (isMobile ? 80 : 300);
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      const spreadX = isMobile ? 800 : 1400;
      const spreadY = isMobile ? 900 : 1400;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spreadX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
        scales[i] = Math.random() * 2.2 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      // Particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(242, 56, 56, 0.7)');
      grad.addColorStop(1, 'rgba(242, 56, 56, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);

      pTexture = new THREE.CanvasTexture(canvas);
      pMaterial = new THREE.PointsMaterial({
        size: isMobile ? 3.5 : 4,
        map: pTexture,
        transparent: true,
        opacity: isMobile ? 0.35 : 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, pMaterial);
      scene.add(particles);

      // 3D FLOATING HORIZON GRID
      const gridHelper = new THREE.GridHelper(
        isMobile ? 1200 : 1800,
        isMobile ? 24 : 36,
        0xf23838,
        0x1a1a1a
      );
      gridHelper.position.y = -220;
      gridHelper.material.opacity = isMobile ? 0.08 : 0.14;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // LIGHTING
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // MOUSE / TOUCH PARALLAX
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      if (!isMobile) {
        window.addEventListener('mousemove', onMouseMove, { passive: true });
      }

      // GSAP SCROLLTRIGGER FOR 3D CAMERA TRACKING
      const scrollObj = { progress: 0 };
      st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          scrollObj.progress = self.progress;
        },
      });

      // TAB VISIBILITY LISTENER TO PREVENT BATTERY DRAIN ON PHONES
      const onVisibilityChange = () => {
        isTabVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // RENDER LOOP
      const clock = new THREE.Clock();

      const animate = () => {
        reqId = requestAnimationFrame(animate);

        // Pause calculations if tab is hidden
        if (!isTabVisible) return;

        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        const scrollProgress = scrollObj.progress;
        const targetCamZ = 400 - scrollProgress * (isMobile ? 120 : 180);
        const targetCamY = -scrollProgress * (isMobile ? 150 : 220) + targetY * -25;
        const targetCamX = Math.sin(scrollProgress * Math.PI * 2) * (isMobile ? 30 : 60) + targetX * 35;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.position.z += (targetCamZ - camera.position.z) * 0.06;

        camera.rotation.y = -targetX * 0.08 + Math.sin(elapsedTime * 0.15) * 0.015;
        camera.rotation.x = targetY * 0.06;

        if (!prefersReducedMotion) {
          const posArray = geometry.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.15 - 0.1;
            posArray[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.1;
            if (posArray[i * 3 + 1] < -700) posArray[i * 3 + 1] = 700;
          }
          geometry.attributes.position.needsUpdate = true;
          gridHelper.position.z = (elapsedTime * (isMobile ? 12 : 20)) % 50;
        }

        renderer.render(scene, camera);
      };

      animate();

      const onResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        if (reqId) cancelAnimationFrame(reqId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (st) st.kill();
        if (geometry) geometry.dispose();
        if (pMaterial) pMaterial.dispose();
        if (pTexture) pTexture.dispose();
        if (renderer) {
          renderer.dispose();
          if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('WebGL initialization skipped:', err);
      return;
    }
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
};

export default CinematicCanvas;
