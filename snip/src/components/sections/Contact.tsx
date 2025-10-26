'use client';

import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const ContactSection = styled.div`
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.accent};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    
    svg {
      color: ${({ theme }) => theme.colors.background};
    }
  }
  
  svg {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;
  }
  
  span {
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default function Contact() {
  const socialLinks = [
    { name: 'Email', icon: FaEnvelope, url: 'mailto:your@email.com' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
  ];

  return (
    <ContactSection>
      <h2>Get In Touch</h2>
      <p>
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <SocialLinks>
        {socialLinks.map((link, index) => (
          <SocialLink key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <link.icon />
            <span>{link.name}</span>
          </SocialLink>
        ))}
      </SocialLinks>
    </ContactSection>
  );
}
