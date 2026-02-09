/* eslint-disable react-hooks/unsupported-syntax */
"use client";
import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; brightness: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        // Partículas un poco más grandes
        this.size = Math.random() * 2 + 1; 
        this.brightness = Math.random();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          this.x -= dx * 0.015;
          this.y -= dy * 0.015;
        }
      }

      draw() {
        if (!ctx) return;
        // Efecto de brillo (Glow)
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0, 212, 255, 0.5)";
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + this.brightness * 0.4})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Limpiar sombra para las líneas (mejora rendimiento)
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      // Un poco más de densidad
      const quantity = Math.floor((width * height) / 12000); 
      particles = Array.from({ length: Math.min(quantity, 120) }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;

          // Radio de conexión más amplio (200px -> 40000)
          if (dist < 40000) { 
            const opacity = (1 - dist / 40000) * 0.25;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-70 pointer-events-none bg-transparent" 
    />
  );
}