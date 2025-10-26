'use client';

import { LayoutContainer, LeftPanel, RightPanel, Section } from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <LayoutContainer>
      <LeftPanel>
        <Home />
        <Navigation />
      </LeftPanel>
      <RightPanel>
        <Section id="about">
          <About />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="skills">
          <Skills />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
      </RightPanel>
    </LayoutContainer>
  );
}
