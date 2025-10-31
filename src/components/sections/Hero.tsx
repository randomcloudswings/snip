import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '../ui/button'
import { useReducedMotion, useParallax } from '@/hooks'
import { ANIMATION_EASINGS, ANIMATION_DURATIONS, STAGGER_AMOUNTS } from '@/utils/animations'

export function Hero() {
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const bgLayerRef = useParallax<HTMLDivElement>({ speed: 0.3 })
  const contentLayerRef = useParallax<HTMLDivElement>({ speed: 0.1 })

  useEffect(() => {
    if (!headingRef.current || !subtitleRef.current || !ctaRef.current || !scrollHintRef.current) return

    const timeline = gsap.timeline({
      defaults: {
        ease: ANIMATION_EASINGS.expo,
      },
    })

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, subtitleRef.current, ctaRef.current, scrollHintRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    const lines = headingRef.current.querySelectorAll('[data-gsap-line]')
    const buttons = ctaRef.current.querySelectorAll('button')

    gsap.set([lines, subtitleRef.current, buttons, scrollHintRef.current], {
      opacity: 0,
      force3D: true,
    })

    gsap.set(lines, { y: 100, clipPath: 'inset(100% 0 0 0)' })
    gsap.set(subtitleRef.current, { y: 30 })
    gsap.set(buttons, { y: 20, scale: 0.9 })
    gsap.set(scrollHintRef.current, { y: 20 })

    timeline
      .to(lines, {
        duration: ANIMATION_DURATIONS.slow,
        y: 0,
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        stagger: STAGGER_AMOUNTS.normal,
        ease: ANIMATION_EASINGS.expo,
      })
      .to(
        subtitleRef.current,
        {
          duration: ANIMATION_DURATIONS.medium,
          opacity: 1,
          y: 0,
          ease: ANIMATION_EASINGS.smooth,
        },
        '-=0.6'
      )
      .to(
        buttons,
        {
          duration: ANIMATION_DURATIONS.medium,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: STAGGER_AMOUNTS.tight,
          ease: ANIMATION_EASINGS.bounce,
        },
        '-=0.4'
      )
      .to(
        scrollHintRef.current,
        {
          duration: ANIMATION_DURATIONS.medium,
          opacity: 1,
          y: 0,
          ease: ANIMATION_EASINGS.smooth,
        },
        '-=0.3'
      )

    return () => {
      timeline.kill()
    }
  }, [prefersReducedMotion])

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-scroll-section
      aria-label="Hero section"
    >
      <div 
        ref={bgLayerRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" 
        data-parallax-layer="bg" 
      />
      
      <div 
        ref={contentLayerRef}
        className="container mx-auto px-4 py-20 relative z-10" 
        data-parallax-layer="content"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div ref={headingRef} data-gsap-hero-heading>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
                <span className="block" data-gsap-line="1">
                  Creative Developer
                </span>
                <span className="block mt-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" data-gsap-line="2">
                  &amp; Problem Solver
                </span>
              </h1>
            </div>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto" 
              data-gsap-hero-subtitle
            >
              Crafting elegant solutions with modern technologies. Turning ideas into exceptional digital experiences.
            </p>
          </div>

          <div 
            ref={ctaRef}
            className="flex flex-wrap gap-4 justify-center items-center" 
            data-gsap-hero-cta
          >
            <Button 
              size="lg" 
              className="text-base px-8 py-6"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div 
            ref={scrollHintRef}
            className="pt-12 text-sm text-muted-foreground" 
            data-gsap-hero-scroll
          >
            <p>Scroll to explore</p>
            <div className="mt-4 mx-auto w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
