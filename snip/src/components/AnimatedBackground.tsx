import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = `rgba(211, 218, 217, ${Math.random() * 0.3 + 0.1})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        x: `${(Math.random() - 0.5) * 200}px`,
        y: `${(Math.random() - 0.5) * 200}px`,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #37353E 0%, #44444E 50%, #715A5A 100%)',
      }}
    />
  );
};

export default AnimatedBackground;
