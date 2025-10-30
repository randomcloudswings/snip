import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(113, 90, 90, 0.3)',
        borderColor: 'rgba(113, 90, 90, 0.8)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        width: 20,
        height: 20,
        backgroundColor: 'rgba(211, 218, 217, 0.5)',
        borderColor: 'rgba(211, 218, 217, 0.8)',
        duration: 0.3,
      });
    };

    document.addEventListener('mousemove', moveCursor);

    const hoverElements = document.querySelectorAll('a, button, [role="button"]');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] w-5 h-5 rounded-full border-2"
        style={{
          backgroundColor: 'rgba(211, 218, 217, 0.5)',
          borderColor: 'rgba(211, 218, 217, 0.8)',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[10000] w-1 h-1 rounded-full"
        style={{
          backgroundColor: '#D3DAD9',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
