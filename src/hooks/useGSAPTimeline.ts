import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export function useGSAPTimeline() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [])

  const createTimeline = (config?: gsap.TimelineVars) => {
    const timeline = gsap.timeline(config)
    
    if (prefersReducedMotion) {
      timeline.timeScale(100)
    }
    
    return timeline
  }

  return { timeline: timelineRef.current, createTimeline, prefersReducedMotion }
}
