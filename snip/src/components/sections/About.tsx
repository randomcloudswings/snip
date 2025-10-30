import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current?.children) {
        gsap.from(Array.from(cardsRef.current.children), {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 80,
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
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-[#D3DAD9]"
        >
          About Me
        </h2>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="parallax-card hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#D3DAD9]">Who I Am</h3>
              <p className="text-[#D3DAD9]/70 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardContent>
          </Card>
          <Card className="parallax-card hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#D3DAD9]">What I Do</h3>
              <p className="text-[#D3DAD9]/70 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </CardContent>
          </Card>
          <Card className="parallax-card hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#D3DAD9]">My Passion</h3>
              <p className="text-[#D3DAD9]/70 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </CardContent>
          </Card>
          <Card className="parallax-card hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#D3DAD9]">My Goals</h3>
              <p className="text-[#D3DAD9]/70 leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
