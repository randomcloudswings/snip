'use client';

import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  justify-content: center;
`;

const Headline = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.light};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: -0.02em;
  margin: 0;
  
  span {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subheadline = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.8;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
  max-width: 90%;
`;

const BodyCopy = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
  max-width: 85%;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PrimaryCTA = styled.a`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(139, 127, 255, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 127, 255, 0.5);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;

const SecondaryCTA = styled.a`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  background: transparent;
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }
  
  &:hover {
    background: rgba(139, 127, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(139, 127, 255, 0.3);
    
    &::before {
      opacity: 0.1;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 127, 255, 0.3);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;

export default function Hero() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <HeroContainer>
      <Headline>
        Building <span>Digital</span> Experiences That Matter
      </Headline>
      <Subheadline>
        Full-stack developer crafting elegant solutions with modern web technologies
      </Subheadline>
      <BodyCopy>
        Specializing in animation-heavy interfaces, seamless user experiences, and scalable architectures.
      </BodyCopy>
      <CTAGroup>
        <PrimaryCTA 
          href="#projects"
          onClick={(e) => handleClick(e, '#projects')}
        >
          <span>View My Work</span>
        </PrimaryCTA>
        <SecondaryCTA 
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
        >
          <span>Get In Touch</span>
        </SecondaryCTA>
      </CTAGroup>
    </HeroContainer>
  );
}
