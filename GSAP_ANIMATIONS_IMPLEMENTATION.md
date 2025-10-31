# GSAP Animations Implementation

## Overview

This document details the comprehensive GSAP animation implementation across the portfolio website, including scroll-triggered animations, parallax effects, hover interactions, and reduced-motion support.

## Features Implemented

### 1. Custom Animation Hooks (`src/hooks/`)

#### `useReducedMotion()`
- Detects user's motion preference via `prefers-reduced-motion` media query
- Listens for runtime changes to motion preferences
- Used throughout to conditionally disable/simplify animations

#### `useGSAPTimeline()`
- Creates and manages GSAP timelines
- Automatically adjusts for reduced motion (timeScale 100x)
- Handles cleanup on component unmount

#### `useScrollTrigger()`
- Creates scroll-triggered animations
- Supports all ScrollTrigger configuration options
- Automatically respects reduced-motion preferences
- Proper cleanup of ScrollTrigger instances

#### `useHoverAnimation()`
- Adds GSAP-powered hover effects to elements
- Configurable scale, duration, easing, glow, and shadow
- GPU-accelerated transforms
- Respects reduced-motion preferences

#### `useParallax()`
- Creates smooth parallax scrolling effects
- Configurable speed and scroll ranges
- Uses ScrollTrigger with scrub for smooth performance
- GPU-accelerated with `force3D`

### 2. Animation Utilities (`src/utils/animations.ts`)

**Constants:**
- `ANIMATION_EASINGS`: Pre-defined easing functions (smooth, bounce, elastic, expo, inOut)
- `ANIMATION_DURATIONS`: Standard durations (fast: 0.3s, medium: 0.6s, slow: 1.2s, verySlow: 2s)
- `STAGGER_AMOUNTS`: Stagger delays (tight: 0.05s, normal: 0.1s, relaxed: 0.2s, loose: 0.3s)

**Helper Functions:**
- `createFadeUpAnimation()`: Fade in from below
- `createFadeInAnimation()`: Simple fade in
- `createScaleAnimation()`: Scale with fade
- `createSlideInAnimation()`: Slide from left/right with fade
- `setupGPUAcceleration()`: Apply GPU optimization to elements
- `cleanupGPUAcceleration()`: Remove will-change after animation

### 3. Hero Section Animations

**Entrance Timeline:**
- Masked text reveals with `clipPath` animation
- Sequential reveal of heading lines with stagger
- Subtitle fade-up
- CTA buttons with bounce effect and stagger
- Scroll hint fade-in

**Parallax Layers:**
- Background layer: 0.3 speed multiplier
- Content layer: 0.1 speed multiplier
- Creates depth through differential movement

**Features:**
- Directional awareness (animations reverse when scrolling back)
- GPU-accelerated transforms
- Smooth timing with overlapping animations
- Proper cleanup on unmount

### 4. Section Scroll Animations

All sections (About, Skills, Projects, Contact) implement:

**Header Animation:**
- Fade in from below
- Triggers at 80% viewport entry
- Reverses on scroll back up

**Content Animation:**
- Staggered reveal of cards/items
- Different entrance effects per section:
  - About: Scale + fade with bounce
  - Skills: Scale + fade with tight stagger
  - Projects: 3D rotation + fade
  - Contact: Fade-up with stagger

**Parallax Effects:**
- Skills section: 0.15 speed multiplier
- Projects section: 0.2 speed multiplier
- Adds depth to content containers

### 5. Hover Micro-Interactions

**Navigation:**
- Logo: Scale 1.05 with back.out easing
- Nav links: Scale 1.05 on hover
- Smooth 0.3s transitions

**Buttons:**
- All buttons scale to 1.05 on hover
- Integrated directly into Button component
- Universal across all button instances

**Cards:**
- About cards: Scale 1.03 with shadow
- Skill cards: Scale 1.05 with shadow and glow
- Project cards: Scale 1.03 with shadow
- Smooth hover state transitions

### 6. Reduced Motion Support

**CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**JavaScript:**
- All animations check `useReducedMotion()` hook
- When reduced motion is preferred:
  - Timelines are skipped
  - Elements are set to end state instantly with `gsap.set()`
  - Hover animations are disabled
  - Parallax effects are disabled

### 7. Performance Optimizations

**GPU Acceleration:**
- `force3D: true` on all animated elements
- `transform: translateZ(0)` CSS utility class
- `will-change: transform` during animations
- Cleanup of `will-change` after animations complete

**Efficient Selectors:**
- Refs used instead of DOM queries
- Batch operations where possible
- Memoized references

**ScrollTrigger Optimization:**
- `scrub: true` for smooth scroll-linked animations
- Proper trigger points (80% viewport entry)
- Efficient cleanup on component unmount

**Responsive Handling:**
- ScrollTrigger refresh on window resize
- Animations adapt to viewport changes
- Mobile-friendly with reduced complexity

### 8. App-Level Setup (`src/App.tsx`)

**Global ScrollTrigger Management:**
- GSAP context for scoped animations
- Window resize listener for ScrollTrigger refresh
- Cleanup of all ScrollTrigger instances on unmount
- Prevents memory leaks and orphaned triggers

## Animation Patterns

### Section Animation Pattern
```typescript
useEffect(() => {
  // Cache refs for cleanup
  const header = headerRef.current
  const content = contentRef.current
  
  // Early return if reduced motion
  if (prefersReducedMotion) {
    gsap.set([header, content], { opacity: 1, y: 0 })
    return
  }
  
  // Create timeline with ScrollTrigger
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Setup and animate
  gsap.set(header, { opacity: 0, y: 50 })
  timeline.to(header, { opacity: 1, y: 0 })
  
  // Cleanup
  return () => {
    timeline.kill()
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === header) trigger.kill()
    })
  }
}, [prefersReducedMotion])
```

## Testing Reduced Motion

To test reduced motion support:

**macOS:**
- System Preferences → Accessibility → Display → Reduce Motion

**Windows:**
- Settings → Ease of Access → Display → Show animations in Windows

**Browser DevTools:**
- Chrome/Edge: DevTools → Command Palette → "Emulate CSS prefers-reduced-motion"
- Firefox: DevTools → Accessibility → Simulate → prefers-reduced-motion: reduce

## Performance Metrics

**Build Size:**
- GSAP core + ScrollTrigger: ~40KB gzipped
- Total bundle: 400.51 KB (133.88 KB gzipped)
- CSS: 24.90 KB (5.13 KB gzipped)

**Runtime Performance:**
- GPU-accelerated transforms for 60fps animations
- Efficient ScrollTrigger with scrub for smooth parallax
- No layout shifts or reflows during animations
- Proper cleanup prevents memory leaks

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (including iOS)
- All animations degrade gracefully on older browsers
- Reduced motion support in all modern browsers

## Future Enhancements

Potential improvements for future iterations:

1. **Intersection Observer API**: Additional optimization for scroll animations
2. **Custom Cursor**: GSAP-powered custom cursor animations
3. **Page Transitions**: Smooth transitions between page sections
4. **Loading Animations**: Entrance animations for initial page load
5. **Scroll Progress Indicator**: Visual indicator of scroll progress
6. **Advanced Parallax**: Multi-layer depth effects with mouse parallax
