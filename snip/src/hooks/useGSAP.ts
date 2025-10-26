import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(callback: () => void | (() => void), deps: any[] = []) {
  useEffect(() => {
    const cleanup = callback();
    
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, deps);
}

export function useFadeIn(delay: number = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

export function useScrollAnimation(options?: {
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: ref.current,
          start: options?.start || 'top 80%',
          end: options?.end || 'top 20%',
          scrub: options?.scrub || false,
          markers: options?.markers || false,
        },
      });
    });

    return () => ctx.revert();
  }, [options?.start, options?.end, options?.scrub, options?.markers]);

  return ref;
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          invalidateOnRefresh: true,
          scrub: 0,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export function useStaggerAnimation(staggerAmount: number = 0.1) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: staggerAmount,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, [staggerAmount]);

  return containerRef;
}
