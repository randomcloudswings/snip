import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import {
  Code2,
  Database,
  Leaf,
  FileJson,
  FileCode,
  Palette,
  Blocks,
  FileText,
  GitBranch,
  Send,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Java', icon: Code2, color: '#715A5A' },
  { name: 'Spring', icon: Leaf, color: '#D3DAD9' },
  { name: 'Postgres', icon: Database, color: '#715A5A' },
  { name: 'MySQL', icon: Database, color: '#D3DAD9' },
  { name: 'JavaScript', icon: FileJson, color: '#715A5A' },
  { name: 'HTML5', icon: FileCode, color: '#D3DAD9' },
  { name: 'CSS3', icon: Palette, color: '#715A5A' },
  { name: 'React', icon: Blocks, color: '#D3DAD9' },
  { name: 'Python', icon: FileText, color: '#715A5A' },
  { name: 'Bash Script', icon: FileCode, color: '#D3DAD9' },
  { name: 'Git', icon: GitBranch, color: '#715A5A' },
  { name: 'Postman', icon: Send, color: '#D3DAD9' },
];

const Skills = () => {
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

      if (gridRef.current?.children) {
        gsap.from(Array.from(gridRef.current.children), {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          scale: 0.5,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }

      const cards = gridRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          const element = card as HTMLElement;
          
          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              y: -10,
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-[#D3DAD9]"
        >
          Skills & Technologies
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="skill-card hover:shadow-2xl transition-shadow duration-300"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <skill.icon
                  className="w-12 h-12 mb-3"
                  style={{ color: skill.color }}
                />
                <h3 className="text-sm font-medium text-center text-[#D3DAD9]">
                  {skill.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
