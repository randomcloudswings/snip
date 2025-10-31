import { useRef, useEffect } from 'react'
import p5 from 'p5'
import { useReducedMotion } from '@/hooks'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  noiseOffsetX: number
  noiseOffsetY: number
  alpha: number
  colorIndex: number
}

interface InkBackgroundProps {
  particleCount?: number
  respectReducedMotion?: boolean
}

export function InkBackground({ 
  particleCount = 50, 
  respectReducedMotion = true 
}: InkBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const p5Instance = useRef<p5 | null>(null)
  const effectiveReducedMotion = respectReducedMotion && prefersReducedMotion
  const effectiveParticleCount = effectiveReducedMotion ? Math.min(particleCount, 20) : particleCount

  useEffect(() => {
    if (!containerRef.current) return

    const sketch = (p: p5) => {
      let particles: Particle[] = []
      let resizeThrottle: number | null = null
      
      const colors = [
        { r: 55, g: 53, b: 62, name: 'dark-purple' },      // #37353E
        { r: 68, g: 68, b: 78, name: 'medium-gray' },      // #44444E
        { r: 113, g: 90, b: 90, name: 'muted-rose' },      // #715A5A
        { r: 211, g: 218, b: 217, name: 'light-gray' },    // #D3DAD9
      ]

      const initializeParticles = () => {
        particles = []
        for (let i = 0; i < effectiveParticleCount; i++) {
          particles.push({
            x: p.random(p.windowWidth),
            y: p.random(p.windowHeight),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            size: p.random(40, 120),
            noiseOffsetX: p.random(1000),
            noiseOffsetY: p.random(1000),
            alpha: p.random(0.1, 0.3),
            colorIndex: Math.floor(p.random(colors.length)),
          })
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.style('display', 'block')
        canvas.style('position', 'fixed')
        canvas.style('top', '0')
        canvas.style('left', '0')
        canvas.style('z-index', '0')
        p.pixelDensity(1) // Optimize performance
        p.frameRate(60)
        initializeParticles()
      }

      p.windowResized = () => {
        if (resizeThrottle) {
          clearTimeout(resizeThrottle)
        }
        
        resizeThrottle = window.setTimeout(() => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          resizeThrottle = null
        }, 250)
      }

      p.draw = () => {
        p.clear()
        p.background(55, 53, 62, 255) // Base color from palette
        
        // Use screen blend mode for glowing effect
        p.blendMode(p.SCREEN)
        
        particles.forEach((particle) => {
          if (!effectiveReducedMotion) {
            // Use Perlin noise for organic movement
            const noiseX = p.noise(particle.noiseOffsetX) * 2 - 1
            const noiseY = p.noise(particle.noiseOffsetY) * 2 - 1
            
            // Apply vector field forces
            particle.vx += noiseX * 0.05
            particle.vy += noiseY * 0.05
            
            // Damping for smooth motion
            particle.vx *= 0.98
            particle.vy *= 0.98
            
            // Update position
            particle.x += particle.vx
            particle.y += particle.vy
            
            // Increment noise offsets for animation
            particle.noiseOffsetX += 0.003
            particle.noiseOffsetY += 0.003
            
            // Wrap around edges
            if (particle.x < -particle.size) particle.x = p.windowWidth + particle.size
            if (particle.x > p.windowWidth + particle.size) particle.x = -particle.size
            if (particle.y < -particle.size) particle.y = p.windowHeight + particle.size
            if (particle.y > p.windowHeight + particle.size) particle.y = -particle.size
          }
          
          // Draw particle with gradient and glow
          const color = colors[particle.colorIndex]
          const glowLayers = effectiveReducedMotion ? 1 : 3
          
          for (let i = glowLayers; i > 0; i--) {
            const size = particle.size * (1 + i * 0.3)
            const alpha = particle.alpha / (i + 1)
            p.noStroke()
            p.fill(color.r, color.g, color.b, alpha * 255)
            p.ellipse(particle.x, particle.y, size, size)
          }
        })
        
        // Switch to overlay mode for additional depth
        p.blendMode(p.OVERLAY)
        
        particles.forEach((particle) => {
          const color = colors[particle.colorIndex]
          p.noStroke()
          p.fill(color.r, color.g, color.b, particle.alpha * 50)
          p.ellipse(particle.x, particle.y, particle.size * 1.5, particle.size * 1.5)
        })
      }
    }

    // Create p5 instance
    p5Instance.current = new p5(sketch, containerRef.current)

    // Cleanup on unmount
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove()
        p5Instance.current = null
      }
    }
  }, [effectiveReducedMotion, effectiveParticleCount])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
