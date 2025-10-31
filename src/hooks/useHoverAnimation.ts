import { useRef, useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export interface HoverAnimationConfig {
  scale?: number
  duration?: number
  ease?: string
  glow?: boolean
  shadow?: boolean
}

export function useHoverAnimation<T extends HTMLElement>(
  config: HoverAnimationConfig = {}
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const {
    scale = 1.05,
    duration = 0.3,
    ease = 'power2.out',
    glow = false,
    shadow = true,
  } = config

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      const animationProps: Record<string, unknown> = {
        scale,
        duration,
        ease,
      }

      if (shadow) {
        animationProps.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)'
      }

      if (glow) {
        animationProps.filter = 'brightness(1.1)'
      }

      gsap.to(element, animationProps)
    }

    const handleMouseLeave = () => {
      const animationProps: Record<string, unknown> = {
        scale: 1,
        duration,
        ease,
      }

      if (shadow) {
        animationProps.boxShadow = '0 0 0 rgba(0, 0, 0, 0)'
      }

      if (glow) {
        animationProps.filter = 'brightness(1)'
      }

      gsap.to(element, animationProps)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scale, duration, ease, glow, shadow, prefersReducedMotion])

  return elementRef
}
