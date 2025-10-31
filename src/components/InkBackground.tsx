import { useRef } from 'react'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import type { Sketch, SketchProps } from '@p5-wrapper/react'
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

const InkBackgroundSketch: Sketch = (p5) => {
  let particles: Particle[] = []
  let particleCount = 50
  let reducedMotion = false
  let canvasInitialized = false
  let resizeThrottle: number | null = null
  
  const colors = [
    { r: 55, g: 53, b: 62, name: 'dark-purple' },      // #37353E
    { r: 68, g: 68, b: 78, name: 'medium-gray' },      // #44444E
    { r: 113, g: 90, b: 90, name: 'muted-rose' },      // #715A5A
    { r: 211, g: 218, b: 217, name: 'light-gray' },    // #D3DAD9
  ]

  p5.updateWithProps = (props: SketchProps & { particleCount?: number; reducedMotion?: boolean }) => {
    if (props.particleCount !== undefined && props.particleCount !== particleCount) {
      particleCount = props.particleCount
      if (canvasInitialized) {
        initializeParticles()
      }
    }
    if (props.reducedMotion !== undefined) {
      reducedMotion = props.reducedMotion
    }
  }

  const initializeParticles = () => {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: p5.random(p5.windowWidth),
        y: p5.random(p5.windowHeight),
        vx: p5.random(-0.5, 0.5),
        vy: p5.random(-0.5, 0.5),
        size: p5.random(40, 120),
        noiseOffsetX: p5.random(1000),
        noiseOffsetY: p5.random(1000),
        alpha: p5.random(0.1, 0.3),
        colorIndex: Math.floor(p5.random(colors.length)),
      })
    }
  }

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
    canvas.style('display', 'block')
    p5.pixelDensity(1) // Optimize performance
    p5.frameRate(60)
    initializeParticles()
    canvasInitialized = true
  }

  p5.windowResized = () => {
    if (resizeThrottle) {
      clearTimeout(resizeThrottle)
    }
    
    resizeThrottle = window.setTimeout(() => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
      resizeThrottle = null
    }, 250)
  }

  p5.draw = () => {
    p5.clear()
    p5.background(55, 53, 62, 255) // Base color from palette
    
    // Use screen blend mode for glowing effect
    p5.blendMode(p5.SCREEN)
    
    particles.forEach((particle) => {
      if (!reducedMotion) {
        // Use Perlin noise for organic movement
        const noiseX = p5.noise(particle.noiseOffsetX) * 2 - 1
        const noiseY = p5.noise(particle.noiseOffsetY) * 2 - 1
        
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
        if (particle.x < -particle.size) particle.x = p5.windowWidth + particle.size
        if (particle.x > p5.windowWidth + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = p5.windowHeight + particle.size
        if (particle.y > p5.windowHeight + particle.size) particle.y = -particle.size
      }
      
      // Draw particle with gradient and glow
      const color = colors[particle.colorIndex]
      const glowLayers = reducedMotion ? 1 : 3
      
      for (let i = glowLayers; i > 0; i--) {
        const size = particle.size * (1 + i * 0.3)
        const alpha = particle.alpha / (i + 1)
        p5.noStroke()
        p5.fill(color.r, color.g, color.b, alpha * 255)
        p5.ellipse(particle.x, particle.y, size, size)
      }
    })
    
    // Switch to overlay mode for additional depth
    p5.blendMode(p5.OVERLAY)
    
    particles.forEach((particle) => {
      const color = colors[particle.colorIndex]
      p5.noStroke()
      p5.fill(color.r, color.g, color.b, particle.alpha * 50)
      p5.ellipse(particle.x, particle.y, particle.size * 1.5, particle.size * 1.5)
    })
  }
}

export function InkBackground({ 
  particleCount = 50, 
  respectReducedMotion = true 
}: InkBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const effectiveReducedMotion = respectReducedMotion && prefersReducedMotion

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <ReactP5Wrapper
        sketch={InkBackgroundSketch}
        particleCount={effectiveReducedMotion ? Math.min(particleCount, 20) : particleCount}
        reducedMotion={effectiveReducedMotion}
      />
    </div>
  )
}
