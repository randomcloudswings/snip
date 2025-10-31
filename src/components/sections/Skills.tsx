import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Code2 } from 'lucide-react'
import { useReducedMotion, useHoverAnimation, useParallax } from '@/hooks'
import { ANIMATION_EASINGS, ANIMATION_DURATIONS, STAGGER_AMOUNTS } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  category: string
}

const skills: Skill[] = [
  { name: 'Java', category: 'Backend' },
  { name: 'Spring', category: 'Backend' },
  { name: 'Postgres', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Bash Script', category: 'DevOps' },
  { name: 'Git', category: 'DevOps' },
  { name: 'Postman', category: 'Tools' },
]

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useHoverAnimation<HTMLDivElement>({ scale: 1.05, shadow: true, glow: true })
  
  return (
    <Card 
      ref={cardRef}
      className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-border transition-all duration-300 group"
      data-gsap-skill-card={index}
    >
      <CardHeader className="pb-3">
        <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
          <Code2 className="w-6 h-6 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">{skill.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xs text-muted-foreground font-medium">
          {skill.category}
        </span>
      </CardContent>
    </Card>
  )
}

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const contentLayerRef = useParallax<HTMLDivElement>({ speed: 0.15 })

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const header = headerRef.current
    const grid = gridRef.current

    if (prefersReducedMotion) {
      gsap.set([header, grid.children], {
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

    const cards = grid.children
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.8, force3D: true })

    const cardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
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
      stagger: STAGGER_AMOUNTS.tight,
      ease: ANIMATION_EASINGS.bounce,
    })

    return () => {
      headerTimeline.kill()
      cardsTimeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === header || trigger.vars.trigger === grid) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div ref={contentLayerRef} className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-6xl mx-auto space-y-12">
          <div 
            ref={headerRef}
            className="text-center space-y-4" 
            data-gsap-skills-header
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Skills &amp; Technologies
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A diverse toolkit for building modern applications.
            </p>
          </div>

          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            data-gsap-skills-grid
          >
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
