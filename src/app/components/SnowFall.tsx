import React, { useRef, useEffect } from "react";
import styles from "./SnowFall.module.css";

interface Particle {
  x: number;
  y: number;
  r: number;
  d: number;
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas dimensions
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Snowflake particles
    const maxParticles = 50;
    const particles: Particle[] = Array.from({ length: maxParticles }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * maxParticles,
    }));

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (const particle of particles) {
        ctx.moveTo(particle.x, particle.y);
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    };

    const update = () => {
      angle += 0.01;
      particles.forEach((particle, i) => {
        particle.y += Math.cos(angle + particle.d) + 1 + particle.r / 2;
        particle.x += Math.sin(angle) * 2;

        if (particle.x > W + 5 || particle.x < -5 || particle.y > H) {
          if (i % 3 > 0) {
            particles[i] = { x: Math.random() * W, y: -10, r: particle.r, d: particle.d };
          } else if (Math.sin(angle) > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: particle.r, d: particle.d };
          } else {
            particles[i] = { x: W + 5, y: Math.random() * H, r: particle.r, d: particle.d };
          }
        }
      });
    };

    // Animation loop
    const fps = 30;
    const interval = setInterval(draw, 1000 / fps);

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
  />
);
};

export default Snowfall;
