'use client';

import styled from 'styled-components';

const HomeSection = styled.div`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.light};
    opacity: 0.8;
  }
`;

export default function Home() {
  return (
    <HomeSection>
      <h1>Welcome to My Portfolio</h1>
      <p>
        Animation-heavy portfolio showcasing creative projects and technical skills.
      </p>
    </HomeSection>
  );
}
