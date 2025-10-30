import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.to('.parallax-card', {
      scrollTrigger: {
        trigger: '.parallax-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: (_i, target) => {
        const speed = (target as HTMLElement).getAttribute('data-speed') || '0.5';
        return -50 * parseFloat(speed);
      },
    });

    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
