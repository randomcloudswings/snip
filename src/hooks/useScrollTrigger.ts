import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollTriggerConfig {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export function useScrollTrigger<T extends HTMLElement>(
  animation: (element: T) => gsap.core.Timeline | gsap.core.Tween,
  config: ScrollTriggerConfig = {}
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const {
    trigger: configTrigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub,
    markers = false,
    toggleActions = 'play none none reverse',
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = config

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const trigger = configTrigger || element

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const tween = animation(element)

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      markers,
      toggleActions,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      animation: tween,
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [animation, configTrigger, start, end, scrub, markers, toggleActions, onEnter, onLeave, onEnterBack, onLeaveBack, prefersReducedMotion])

  return elementRef
}
