import { gsap } from 'gsap'

export const ANIMATION_EASINGS = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
  expo: 'expo.out',
  inOut: 'power2.inOut',
} as const

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  verySlow: 2,
} as const

export const STAGGER_AMOUNTS = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.2,
  loose: 0.3,
} as const

export interface AnimationConfig {
  duration?: number
  ease?: string
  delay?: number
  stagger?: number
}

export const createFadeUpAnimation = (config: AnimationConfig = {}) => ({
  opacity: 0,
  y: 50,
  duration: config.duration ?? ANIMATION_DURATIONS.medium,
  ease: config.ease ?? ANIMATION_EASINGS.smooth,
  delay: config.delay,
  stagger: config.stagger,
})

export const createFadeInAnimation = (config: AnimationConfig = {}) => ({
  opacity: 0,
  duration: config.duration ?? ANIMATION_DURATIONS.medium,
  ease: config.ease ?? ANIMATION_EASINGS.smooth,
  delay: config.delay,
  stagger: config.stagger,
})

export const createScaleAnimation = (config: AnimationConfig = {}) => ({
  scale: 0.8,
  opacity: 0,
  duration: config.duration ?? ANIMATION_DURATIONS.medium,
  ease: config.ease ?? ANIMATION_EASINGS.bounce,
  delay: config.delay,
  stagger: config.stagger,
})

export const createSlideInAnimation = (direction: 'left' | 'right' = 'left', config: AnimationConfig = {}) => ({
  x: direction === 'left' ? -100 : 100,
  opacity: 0,
  duration: config.duration ?? ANIMATION_DURATIONS.medium,
  ease: config.ease ?? ANIMATION_EASINGS.smooth,
  delay: config.delay,
  stagger: config.stagger,
})

export const setupGPUAcceleration = (element: HTMLElement) => {
  gsap.set(element, {
    force3D: true,
    willChange: 'transform',
  })
}

export const cleanupGPUAcceleration = (element: HTMLElement) => {
  gsap.set(element, {
    willChange: 'auto',
  })
}
