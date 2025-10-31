import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/hooks'

interface CursorPosition {
  x: number
  y: number
}

interface CustomCursorProps {
  respectReducedMotion?: boolean
}

export function CustomCursor({ respectReducedMotion = true }: CustomCursorProps) {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)
  
  const mousePosition = useRef<CursorPosition>({ x: 0, y: 0 })
  const previousPosition = useRef<CursorPosition>({ x: 0, y: 0 })
  const velocity = useRef<CursorPosition>({ x: 0, y: 0 })
  
  const rafId = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const effectiveReducedMotion = respectReducedMotion && prefersReducedMotion
  
  const [isNearInteractive, setIsNearInteractive] = useState(false)

  useEffect(() => {
    if (effectiveReducedMotion) {
      return
    }

    const updateCursorPosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const checkInteractiveProximity = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], [tabindex]')
      setIsNearInteractive(!!isInteractive)
    }

    const animate = () => {
      if (!cursorDotRef.current || !cursorGlowRef.current || !cursorTrailRef.current) {
        rafId.current = requestAnimationFrame(animate)
        return
      }

      // Calculate velocity based on cursor movement
      velocity.current = {
        x: mousePosition.current.x - previousPosition.current.x,
        y: mousePosition.current.y - previousPosition.current.y,
      }

      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      )

      // Smooth cursor dot follow
      gsap.to(cursorDotRef.current, {
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: true,
      })

      // Smooth glow follow with lag
      gsap.to(cursorGlowRef.current, {
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      })

      // Trail follows with more lag and responds to speed
      const trailScale = 1 + Math.min(speed / 50, 1)
      gsap.to(cursorTrailRef.current, {
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        duration: 0.5,
        ease: 'power2.out',
        scale: trailScale,
        overwrite: true,
      })

      previousPosition.current = { ...mousePosition.current }
      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mousemove', checkInteractiveProximity)
    
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mousemove', checkInteractiveProximity)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [effectiveReducedMotion])

  // Animate cursor state changes when near interactive elements
  useEffect(() => {
    if (effectiveReducedMotion || !cursorDotRef.current || !cursorGlowRef.current) {
      return
    }

    if (isNearInteractive) {
      gsap.to(cursorDotRef.current, {
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
      gsap.to(cursorGlowRef.current, {
        scale: 1.8,
        opacity: 0.8,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
    } else {
      gsap.to(cursorDotRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(cursorGlowRef.current, {
        scale: 1,
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [isNearInteractive, effectiveReducedMotion])

  if (effectiveReducedMotion) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* Trailing glow signature effect */}
      <div
        ref={cursorTrailRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(211, 218, 217, 0.15) 0%, rgba(113, 90, 90, 0.1) 40%, transparent 70%)',
          filter: 'blur(20px)',
          willChange: 'transform',
        }}
      />
      
      {/* Main glow layer */}
      <div
        ref={cursorGlowRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity"
        style={{
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(211, 218, 217, 0.3) 0%, rgba(113, 90, 90, 0.2) 50%, transparent 70%)',
          filter: 'blur(10px)',
          opacity: 0.6,
          willChange: 'transform',
        }}
      />
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'hsl(var(--foreground))',
          boxShadow: '0 0 10px rgba(211, 218, 217, 0.5)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
