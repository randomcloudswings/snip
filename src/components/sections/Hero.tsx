import { Button } from '../ui/button'

export function Hero() {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-scroll-section
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" data-parallax-layer="bg" />
      
      <div className="container mx-auto px-4 py-20 relative z-10" data-parallax-layer="content">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4" data-gsap-hero-heading>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="block" data-gsap-line="1">
                Creative Developer
              </span>
              <span className="block mt-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" data-gsap-line="2">
                &amp; Problem Solver
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto" data-gsap-hero-subtitle>
              Crafting elegant solutions with modern technologies. Turning ideas into exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center" data-gsap-hero-cta>
            <Button size="lg" className="text-base px-8 py-6">
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              Get In Touch
            </Button>
          </div>

          <div className="pt-12 text-sm text-muted-foreground" data-gsap-hero-scroll>
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
