import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Project Alpha',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['React', 'TypeScript', 'GSAP'],
  },
  {
    title: 'Project Beta',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['Next.js', 'Tailwind', 'Node.js'],
  },
  {
    title: 'Project Gamma',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['Vue', 'Python', 'PostgreSQL'],
  },
  {
    title: 'Project Delta',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['React Native', 'Firebase', 'Redux'],
  },
  {
    title: 'Project Epsilon',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    tags: ['Angular', 'Spring Boot', 'MySQL'],
  },
  {
    title: 'Project Zeta',
    description:
      'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
    tags: ['Django', 'React', 'Docker'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
        });

        Array.from(cards).forEach((card, index) => {
          const element = card as HTMLElement;
          
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            y: index % 2 === 0 ? -30 : 30,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-[#D3DAD9]"
        >
          Featured Projects
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-[#D3DAD9]">{project.title}</CardTitle>
                <CardDescription className="text-[#D3DAD9]/60">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[#715A5A]/30 text-[#D3DAD9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
