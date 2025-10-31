import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useReducedMotion, useHoverAnimation } from '@/hooks'
import { ANIMATION_EASINGS, ANIMATION_DURATIONS, STAGGER_AMOUNTS } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

const aboutCards = [
  {
    title: 'Who I Am',
    description: 'Passionate developer with a keen eye for detail',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    title: 'What I Do',
    description: 'Building modern web applications',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit.',
  },
  {
    title: 'My Approach',
    description: 'User-centered design meets clean code',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.',
  },
]

function AboutCard({ card, index }: { card: typeof aboutCards[0]; index: number }) {
  const cardRef = useHoverAnimation<HTMLDivElement>({ scale: 1.03, shadow: true })
  
  return (
    <Card 
      ref={cardRef}
      className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-border transition-all duration-300"
      data-gsap-card={index}
    >
      <CardHeader>
        <CardTitle className="text-xl">{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {card.content}
        </p>
      </CardContent>
    </Card>
  )
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const header = headerRef.current
    const cardsContainer = cardsRef.current

    if (prefersReducedMotion) {
      gsap.set([header, cardsContainer.children], {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.set(header, { opacity: 0, y: 50, force3D: true })

    headerTimeline.to(header, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DURATIONS.medium,
      ease: ANIMATION_EASINGS.smooth,
    })

    const cards = cardsContainer.children
    gsap.set(cards, { opacity: 0, y: 80, scale: 0.9, force3D: true })

    const cardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: cardsContainer,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    })

    cardsTimeline.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: ANIMATION_DURATIONS.medium,
      stagger: STAGGER_AMOUNTS.normal,
      ease: ANIMATION_EASINGS.bounce,
    })

    return () => {
      headerTimeline.kill()
      cardsTimeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === header || trigger.vars.trigger === cardsContainer) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-6xl mx-auto space-y-12">
          <div 
            ref={headerRef}
            className="text-center space-y-4" 
            data-gsap-about-header
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-gsap-about-cards
          >
            {aboutCards.map((card, index) => (
              <AboutCard key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
