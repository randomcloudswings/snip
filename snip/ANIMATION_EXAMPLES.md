# GSAP Animation Examples

This file contains example code snippets for implementing GSAP animations in the portfolio.

## Basic Setup

### Initialize GSAP in a Component

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      // Your animations here
    }, elementRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return <div ref={elementRef}>Content</div>;
}
```

## Animation Examples

### 1. Fade In on Scroll

```tsx
gsap.from('.fade-in', {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: '.fade-in',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
  },
});
```

### 2. Stagger Animation

```tsx
gsap.from('.card', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.card-container',
    start: 'top 80%',
  },
});
```

### 3. Parallax Effect

```tsx
gsap.to('.parallax-element', {
  y: (i, target) => -100 * target.dataset.speed,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### 4. Pin Section While Scrolling

```tsx
ScrollTrigger.create({
  trigger: '.pinned-section',
  start: 'top top',
  end: 'bottom bottom',
  pin: true,
  pinSpacing: false,
});
```

### 5. Text Reveal Animation

```tsx
gsap.from('.text-reveal', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power4.out',
  stagger: {
    amount: 0.5,
  },
});
```

### 6. Hover Scale Effect

```tsx
const element = document.querySelector('.hover-element');

element?.addEventListener('mouseenter', () => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
  });
});

element?.addEventListener('mouseleave', () => {
  gsap.to(element, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out',
  });
});
```

### 7. Rotating Background Gradient

```tsx
gsap.to('.gradient-bg', {
  backgroundPosition: '200% 50%',
  duration: 10,
  ease: 'none',
  repeat: -1,
  yoyo: true,
});
```

### 8. Timeline Animation

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.timeline-container',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
  },
});

tl.from('.step-1', { opacity: 0, x: -50 })
  .from('.step-2', { opacity: 0, x: -50 })
  .from('.step-3', { opacity: 0, x: -50 });
```

### 9. Number Counter Animation

```tsx
gsap.to('.counter', {
  textContent: 100,
  duration: 2,
  ease: 'power1.inOut',
  snap: { textContent: 1 },
  scrollTrigger: {
    trigger: '.counter',
    start: 'top 80%',
  },
});
```

### 10. Custom Cursor Follow

```tsx
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: 'power2.out',
  });
});
```

## Using Custom Hooks

The project includes custom GSAP hooks in `src/hooks/useGSAP.ts`:

### useFadeIn

```tsx
import { useFadeIn } from '@/hooks/useGSAP';

export default function Component() {
  const ref = useFadeIn(0.2); // 0.2s delay

  return <div ref={ref}>Fades in on mount</div>;
}
```

### useScrollAnimation

```tsx
import { useScrollAnimation } from '@/hooks/useGSAP';

export default function Component() {
  const ref = useScrollAnimation({
    start: 'top 80%',
    end: 'top 20%',
    scrub: false,
  });

  return <div ref={ref}>Animates on scroll</div>;
}
```

### useParallax

```tsx
import { useParallax } from '@/hooks/useGSAP';

export default function Component() {
  const ref = useParallax(0.5); // Speed multiplier

  return <div ref={ref}>Parallax effect</div>;
}
```

### useStaggerAnimation

```tsx
import { useStaggerAnimation } from '@/hooks/useGSAP';

export default function Component() {
  const ref = useStaggerAnimation(0.1); // Stagger delay

  return (
    <div ref={ref}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
    </div>
  );
}
```

## Smooth Scrolling with Lenis

Use the `initSmoothScroll` function from `src/lib/smoothScroll.ts`:

```tsx
'use client';

import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/smoothScroll';

export default function Layout({ children }) {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

## Best Practices

1. **Always use `gsap.context()`** for component-based animations
2. **Clean up animations** in useEffect return functions
3. **Register plugins** at the top of your file: `gsap.registerPlugin(ScrollTrigger)`
4. **Use refs** instead of querySelector when possible
5. **Optimize performance** by using `will-change` CSS property on animated elements
6. **Test on mobile** - reduce animations if needed
7. **Use ScrollTrigger.refresh()** after dynamic content loads
8. **Avoid animating layout properties** (width, height) - prefer transforms

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
