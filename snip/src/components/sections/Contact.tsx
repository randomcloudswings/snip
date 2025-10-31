import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      if (contentRef.current?.children) {
        gsap.from(Array.from(contentRef.current.children), {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#D3DAD9]"
        >
          Get In Touch
        </h2>
        <div ref={contentRef} className="space-y-8">
          <p className="text-lg md:text-xl text-[#D3DAD9]/80 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Feel free to reach out!
          </p>
          <Card className="inline-block">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-[#D3DAD9]">
                <Mail className="w-6 h-6 text-[#715A5A]" />
                <a
                  href="mailto:hello@example.com"
                  className="text-xl font-medium hover:text-[#715A5A] transition-colors"
                >
                  hello@example.com
                </a>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" variant="outline" className="group">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              GitHub
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Linkedin className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              LinkedIn
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Twitter className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Twitter
            </Button>
          </div>
          <div className="pt-8">
            <p className="text-sm text-[#D3DAD9]/60">
              © 2024 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
