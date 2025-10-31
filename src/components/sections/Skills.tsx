import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Code2 } from 'lucide-react'

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

export function Skills() {
  return (
    <section 
      id="skills" 
      className="min-h-screen flex items-center justify-center py-20 md:py-32 relative"
      data-scroll-section
    >
      <div className="container mx-auto px-4" data-parallax-layer="content">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4" data-gsap-skills-header>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Skills &amp; Technologies
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A diverse toolkit for building modern applications.
            </p>
          </div>

          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            data-gsap-skills-grid
          >
            {skills.map((skill, index) => (
              <Card 
                key={skill.name}
                className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:scale-105 group"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
