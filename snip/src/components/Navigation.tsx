'use client';

import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.6;
  transition: all 0.3s ease;
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
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
  
  &.active {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    
    &::before {
      width: 20px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Navigation() {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <Nav>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </Nav>
  );
}
