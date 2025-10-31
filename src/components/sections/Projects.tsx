import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  gradient: string
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A full-featured online shopping experience with secure payment integration.',
    tags: ['React', 'Node.js', 'MongoDB'],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Task Management App',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Streamline your workflow with an intuitive project management tool.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    title: 'Real-Time Chat Application',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Connect with others through instant messaging and video calls.',
    tags: ['React', 'Socket.io', 'Express'],
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Track your investments and analyze market trends in real-time.',
    tags: ['React', 'D3.js', 'Python'],
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Weather Forecast App',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Get accurate weather predictions with beautiful visualizations.',
    tags: ['JavaScript', 'API', 'CSS3'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Blog Platform',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Create, publish, and manage your content with ease.',
    tags: ['React', 'GraphQL', 'Prisma'],
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
]

export function Projects() {
  return (
    <section 
      id="projects" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4" data-gsap-projects-header>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A showcase of my recent work and creative endeavors.
            </p>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-gsap-projects-grid
          >
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl group overflow-hidden"
                data-gsap-project-card={index}
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-6xl font-bold text-foreground/10">
                    {project.title.charAt(0)}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-accent/30 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
