import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useReducedMotion } from '@/hooks'
import { ANIMATION_EASINGS, ANIMATION_DURATIONS, STAGGER_AMOUNTS } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return

    const header = headerRef.current
    const content = contentRef.current

    if (prefersReducedMotion) {
      gsap.set([header, content], {
        opacity: 1,
        y: 0,
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

    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    })

    const contentChildren = content.children
    gsap.set(contentChildren, { opacity: 0, y: 60, force3D: true })

    contentTimeline.to(contentChildren, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DURATIONS.medium,
      stagger: STAGGER_AMOUNTS.normal,
      ease: ANIMATION_EASINGS.smooth,
    })

    return () => {
      headerTimeline.kill()
      contentTimeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === header || trigger.vars.trigger === content) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-4xl mx-auto space-y-12">
          <div 
            ref={headerRef}
            className="text-center space-y-4" 
            data-gsap-contact-header
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
          </div>

          <div 
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8" 
            data-gsap-contact-content
          >
            <div className="lg:col-span-2">
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Tell me about your project..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@example.com</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm font-medium mb-3">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Connect</CardTitle>
                  <CardDescription>Find me on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button size="icon" variant="outline" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" aria-label="Twitter">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
