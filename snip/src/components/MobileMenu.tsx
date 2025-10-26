'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const HamburgerButton = styled.button`
  display: none;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background: rgba(139, 127, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 127, 255, 0.3);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  
  &:hover {
    background: rgba(139, 127, 255, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 127, 255, 0.4);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.dark};
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(139, 127, 255, 0.2);
  padding: ${({ theme }) => theme.spacing.xxl};
  padding-top: 6rem;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(14, 17, 41, 0.8);
  backdrop-filter: blur(4px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: ${({ theme }) => theme.zIndex.overlay - 1};
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const MobileNavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.8;
  transition: all 0.3s ease;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid rgba(139, 127, 255, 0.1);
  
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing.md};
  }
  
  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`;

const MobileCTA = styled.a`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 127, 255, 0.4);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 127, 255, 0.5);
  }
`;

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (href === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  return (
    <>
      <HamburgerButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>

      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <MobileDrawer $isOpen={isOpen}>
        <MobileNav>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <MobileCTA href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>
            Let's Talk
          </MobileCTA>
        </MobileNav>
      </MobileDrawer>
    </>
  );
}
