import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface ParallaxConfig {
  speed?: number
  start?: string
  end?: string
  scrub?: boolean | number
}

export function useParallax<T extends HTMLElement>(
  config: ParallaxConfig = {}
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const {
    speed = 0.5,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = config

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return

    const element = elementRef.current

    gsap.set(element, { force3D: true, willChange: 'transform' })

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        const progress = self.progress
        const yPos = (progress - 0.5) * 100 * speed
        gsap.set(element, { y: yPos })
      },
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
      gsap.set(element, { willChange: 'auto' })
    }
  }, [speed, start, end, scrub, prefersReducedMotion])

  return elementRef
}
