import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative z-10 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-[#D3DAD9] via-[#715A5A] to-[#D3DAD9] bg-clip-text text-transparent">
            Creative Developer
          </span>
          <br />
          <span className="text-[#D3DAD9]">& Digital Artist</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-[#D3DAD9]/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollToSection('projects')}
            className="group"
          >
            View Projects
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="group"
          >
            <Mail className="mr-2" />
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
