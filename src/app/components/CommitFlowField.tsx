// components/CommitFlowField.tsx
// Beautiful CSS-based particle visualization
// Fallback when Three.js has issues

"use client";

import { useEffect, useRef } from "react";

interface CommitFlowFieldProps {
  contributionData?: number[];
  className?: string;
}

export default function CommitFlowField({
  contributionData = [],
  className = "",
}: CommitFlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Calculate particle count based on contribution data
    const totalContributions = contributionData.reduce((a, b) => a + b, 0);
    const particleCount = Math.min(800, Math.max(200, totalContributions * 2));

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        // Add some flow field effect
        const time = Date.now() * 0.0001;
        const noiseX = Math.sin(this.x * 0.01 + time) * 0.1;
        const noiseY = Math.cos(this.y * 0.01 + time) * 0.1;

        this.x += this.vx + noiseX;
        this.y += this.vy + noiseY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 160, 67, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Mouse repulsion
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 10000) {
          // 100 * 100
          const dist = Math.sqrt(distSq);
          const force = (100 - dist) / 100;
          particle.x += (dx / dist) * force * 2;
          particle.y += (dy / dist) * force * 2;
        }

        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(46, 160, 67, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) {
            // 100 * 100
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [contributionData]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} w-full h-full`}
      style={{ background: "transparent" }}
    />
  );
}
