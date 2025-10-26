export const theme = {
  colors: {
    background: '#0e1129',
    dark: '#37353E',
    medium: '#44444E',
    accent: '#715A5A',
    light: '#D3DAD9',
    primary: '#8B7FFF',
    secondary: '#FF6B9D',
    tertiary: '#4ECDC4',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  typography: {
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    overlay: 1000,
    modal: 1100,
    tooltip: 1200,
  },
};

export type Theme = typeof theme;
