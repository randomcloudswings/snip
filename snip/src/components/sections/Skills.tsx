'use client';

import styled from 'styled-components';
import { FaJava, FaReact, FaPython, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiSpring, SiPostgresql, SiMysql, SiJavascript, SiPostman } from 'react-icons/si';
import { BsTerminal } from 'react-icons/bs';

const SkillsSection = styled.div`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.medium};
  }
  
  svg {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.light};
    text-align: center;
  }
`;

export default function Skills() {
  const skills = [
    { name: 'Java', icon: FaJava },
    { name: 'Spring', icon: SiSpring },
    { name: 'Postgres', icon: SiPostgresql },
    { name: 'MySQL', icon: SiMysql },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'HTML5', icon: FaHtml5 },
    { name: 'CSS3', icon: FaCss3Alt },
    { name: 'React', icon: FaReact },
    { name: 'Python', icon: FaPython },
    { name: 'Bash Script', icon: BsTerminal },
    { name: 'Git', icon: FaGitAlt },
    { name: 'Postman', icon: SiPostman },
  ];

  return (
    <SkillsSection>
      <h2>Technical Skills</h2>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={index}>
            <skill.icon />
            <span>{skill.name}</span>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
