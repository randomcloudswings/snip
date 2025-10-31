# Portfolio Project

A modern portfolio website built with Vite, React, TypeScript, Tailwind CSS, and ShadCN UI.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: ShadCN UI (Button, Card, Dialog, Sheet, Typography)
- **Animation**: GSAP with ScrollTrigger
- **Canvas**: p5.js (via @p5-wrapper/react)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Utilities**: clsx, class-variance-authority, tailwind-merge

## Project Structure

```
src/
├── components/
│   ├── ui/              # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   └── typography.tsx
│   └── sections/        # Page sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       └── Contact.tsx
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
├── App.tsx
├── main.tsx
└── index.css           # Global styles & Tailwind
```

## Color Palette

The project uses a custom dark theme based on the following colors:
- Background: `#37353E` (HSL: 262 13% 21%)
- Secondary: `#44444E` (HSL: 262 11% 26%)
- Accent: `#715A5A` (HSL: 0 10% 40%)
- Muted: `#D3DAD9` (HSL: 180 8% 83%)

## Features

- ✅ Smooth scrolling behavior
- ✅ Custom cursor (native cursor hidden)
- ✅ Dark mode by default
- ✅ Responsive design
- ✅ GSAP animation setup
- ✅ TypeScript path aliases (@/* imports)
- ✅ ShadCN UI components ready to use

## Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
