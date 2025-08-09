"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

interface ParticlesProps {
  className?: string;
  density?: number; // particles per pixel^2 (scaled), e.g., 0.00008
  maxParticles?: number; // safety cap
  connectDistance?: number; // px distance to draw connection lines
  color?: string; // particle color
  lineColor?: string; // connection line color
}

export default function Particles({
  className,
  density = 0.00008,
  maxParticles = 160,
  connectDistance = 110,
  color = "rgba(15, 23, 42, 0.5)", // slate-900 at 50%
  lineColor = "rgba(14, 165, 233, 0.18)", // primary tint
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    let destroyed = false;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(width, height);
    };

    const seedParticles = (width: number, height: number) => {
      const targetCount = Math.min(
        Math.floor(width * height * density),
        maxParticles
      );

      const next: Particle[] = [];
      for (let i = 0; i < targetCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.7; // 0.3 - 1.0 px per frame
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.6 + Math.random() * 1.6,
        });
      }
      particlesRef.current = next;
    };

    const step = () => {
      if (destroyed) return;
      const ctx = ctxRef.current;
      if (!ctx || !canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Draw connections first for softer look
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDistance) {
            const alpha = 1 - dist / connectDistance;
            ctx.strokeStyle = setAlpha(lineColor, alpha * 0.8);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      ctx.fillStyle = color;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // soft wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(step);
    };

    const setAlpha = (rgba: string, alpha: number) => {
      // expects rgba or rgb; replace final alpha if present
      if (rgba.startsWith("rgba")) {
        return rgba.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^\)]+\)/, (_m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
      }
      if (rgba.startsWith("rgb(")) {
        return rgba.replace(/rgb\(([^,]+),([^,]+),([^\)]+)\)/, (_m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
      }
      return rgba;
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(step);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      destroyed = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [connectDistance, density, lineColor, maxParticles, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
} 