'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a<{ $isActive: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.light};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
  transition: all 0.3s ease;
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: ${({ $isActive }) => ($isActive ? '20px' : '8px')};
    height: 2px;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.accent};
    transition: all 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    &::before {
      width: 20px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  &:focus {
    outline: none;
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    
    &::before {
      width: 20px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <Nav>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          $isActive={activeSection === item.href.slice(1)}
          onClick={(e) => handleClick(e, item.href)}
        >
          {item.label}
        </NavLink>
      ))}
    </Nav>
  );
}
