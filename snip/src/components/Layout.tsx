'use client';

import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  min-height: 100vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const LeftPanel = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;
    height: auto;
    min-height: 50vh;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const RightPanel = styled.main`
  padding: ${({ theme }) => theme.spacing.xxxl};
  background-color: ${({ theme }) => theme.colors.background};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: auto;
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;
