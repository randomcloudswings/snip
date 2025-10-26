import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function scrollTo(target: string | number, options?: { offset?: number; duration?: number }) {
  if (typeof window === 'undefined') return;

  const element = typeof target === 'string' ? document.querySelector(target) : null;
  
  if (element) {
    const offset = options?.offset || 0;
    const duration = options?.duration || 1;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
    
    gsap.to(window, {
      scrollTo: { y: targetPosition, autoKill: false },
      duration,
      ease: 'power3.inOut',
    });
  } else if (typeof target === 'number') {
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: options?.duration || 1,
      ease: 'power3.inOut',
    });
  }
}
