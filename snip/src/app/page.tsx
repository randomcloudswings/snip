'use client';

import { LayoutContainer, LeftPanel, RightPanel, Section } from '@/components/Layout';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import SocialBar from '@/components/SocialBar';
import MobileMenu from '@/components/MobileMenu';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <SocialBar />
      <MobileMenu />
      <LayoutContainer>
        <LeftPanel>
          <Header />
          <Hero />
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
    </>
  );
}
