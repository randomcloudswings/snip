import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

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

export function About() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4" data-gsap-about-header>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-gsap-about-cards
          >
            {aboutCards.map((card, index) => (
              <Card 
                key={card.title} 
                className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
