'use client';

import styled from 'styled-components';

const AboutSection = styled.div`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: ${({ theme }) => theme.colors.light};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export default function About() {
  return (
    <AboutSection>
      <h2>About Me</h2>
      <p>
        I'm a passionate developer focused on creating beautiful, performant web experiences
        with cutting-edge animation and interaction design.
      </p>
      <p>
        With expertise in modern web technologies, I bring ideas to life through code.
      </p>
    </AboutSection>
  );
}
