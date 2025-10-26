'use client';

import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialBarContainer = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SocialIconLink = styled.a`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 127, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 127, 255, 0.2);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.light};
  font-size: 20px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  &:hover {
    background: rgba(139, 127, 255, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(139, 127, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 127, 255, 0.4);
  }
`;

const GradientLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent,
    ${({ theme }) => theme.colors.primary} 20%,
    ${({ theme }) => theme.colors.secondary} 50%,
    ${({ theme }) => theme.colors.tertiary} 80%,
    transparent
  );
  z-index: 1;
  opacity: 0.5;
`;

const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

export default function SocialBar() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: FaLinkedin,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: FaTwitter,
    },
  ];

  return (
    <SocialBarContainer>
      <SocialList>
        <GradientLine />
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <SocialIconLink
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <Icon />
            </SocialIconLink>
          );
        })}
      </SocialList>
    </SocialBarContainer>
  );
}
