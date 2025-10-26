'use client';

import styled from 'styled-components';

const ProjectsSection = styled.div`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.light};
  }
  
  p {
    color: ${({ theme }) => theme.colors.light};
    opacity: 0.7;
  }
`;

export default function Projects() {
  const projects = [
    {
      title: 'Project One',
      description: 'A brief description of the project and technologies used.',
    },
    {
      title: 'Project Two',
      description: 'Another project showcasing different skills and techniques.',
    },
    {
      title: 'Project Three',
      description: 'Yet another amazing project with unique features.',
    },
  ];

  return (
    <ProjectsSection>
      <h2>Featured Projects</h2>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsSection>
  );
}
