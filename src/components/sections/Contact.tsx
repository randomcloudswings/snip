import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Github, Linkedin, Mail, Twitter, Loader2, Check } from 'lucide-react'
import { useReducedMotion } from '@/hooks'
import { ANIMATION_EASINGS, ANIMATION_DURATIONS, STAGGER_AMOUNTS } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Please enter a valid email address' }),
  message: z.string().min(1, { message: 'Message is required' }).min(10, { message: 'Message must be at least 10 characters' }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setShowSuccess(true)
    form.reset()
  }

  // Animate dialog content when it opens
  useEffect(() => {
    if (!showSuccess || !dialogContentRef.current || prefersReducedMotion) return

    const content = dialogContentRef.current
    const icon = content.querySelector('[data-success-icon]')
    const title = content.querySelector('[data-success-title]')
    const description = content.querySelector('[data-success-description]')
    const button = content.querySelector('[data-success-button]')

    const timeline = gsap.timeline()

    gsap.set([icon, title, description, button], { opacity: 0, y: 20 })

    timeline
      .to(icon, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: ANIMATION_DURATIONS.medium,
        ease: ANIMATION_EASINGS.bounce,
      })
      .to(
        [title, description],
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_DURATIONS.fast,
          stagger: STAGGER_AMOUNTS.tight,
          ease: ANIMATION_EASINGS.smooth,
        },
        '-=0.2'
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_DURATIONS.fast,
          ease: ANIMATION_EASINGS.smooth,
        },
        '-=0.1'
      )

    return () => {
      timeline.kill()
    }
  }, [showSuccess, prefersReducedMotion])

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
    <>
      <section 
        ref={sectionRef}
        id="contact" 
        className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
        data-scroll-section
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto px-4" data-parallax-layer="content">
          <div className="max-w-4xl mx-auto space-y-12">
            <div 
              ref={headerRef}
              className="text-center space-y-4" 
              data-gsap-contact-header
            >
              <h2 id="contact-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                Get In Touch
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? Let&apos;s work together to bring your ideas to life.
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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters',
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name"
                                  {...field}
                                  aria-required="true"
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          rules={{
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please enter a valid email address',
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="your.email@example.com"
                                  {...field}
                                  aria-required="true"
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          rules={{
                            required: 'Message is required',
                            minLength: {
                              value: 10,
                              message: 'Message must be at least 10 characters',
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell me about your project..."
                                  className="min-h-[150px]"
                                  {...field}
                                  aria-required="true"
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isSubmitting}
                          aria-label={isSubmitting ? 'Sending message' : 'Send message'}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    </Form>
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
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email</p>
                        <a 
                          href="mailto:contact@example.com" 
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          contact@example.com
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm font-medium mb-3">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Remote / Available Worldwide
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
                      <Button size="icon" variant="outline" aria-label="GitHub" asChild>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                      <Button size="icon" variant="outline" aria-label="LinkedIn" asChild>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </Button>
                      <Button size="icon" variant="outline" aria-label="Twitter" asChild>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                          <Twitter className="w-5 h-5" />
                        </a>
                      </Button>
                      <Button size="icon" variant="outline" aria-label="Email" asChild>
                        <a href="mailto:contact@example.com">
                          <Mail className="w-5 h-5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent 
          ref={dialogContentRef}
          className="sm:max-w-md"
          aria-describedby="success-description"
        >
          <DialogHeader>
            <div className="flex justify-center mb-4" data-success-icon>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <DialogTitle className="text-center" data-success-title>
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription 
              id="success-description"
              className="text-center" 
              data-success-description
            >
              Thank you for reaching out. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4" data-success-button>
            <Button onClick={() => setShowSuccess(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
