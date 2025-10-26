# Portfolio - Animation Heavy

A modern, animation-heavy portfolio website built with Next.js, TypeScript, styled-components, and GSAP. Features a split-screen layout with smooth animations and interactions.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **styled-components** - CSS-in-JS with theming
- **GSAP** - Professional-grade animation library
- **Lenis** - Smooth scrolling
- **React Icons** - Icon library
- **@splinetool/react-spline** - 3D graphics integration

## Features

- 🎨 Split-screen layout (40% left panel, 60% right panel)
- 🌙 Dark theme with custom color palette
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Server-side rendering with styled-components
- 🎭 Ready for GSAP animations
- 🔤 Custom fonts (Spline Sans Mono and Inter)
- 🎯 Modular component structure

## Color Palette

- **Background**: `#0e1129` - Deep dark blue
- **Dark**: `#37353E` - Dark purple-gray
- **Medium**: `#44444E` - Medium gray
- **Accent**: `#715A5A` - Muted rose-brown
- **Light**: `#D3DAD9` - Light gray-blue
- **Primary**: `#8B7FFF` - Purple
- **Secondary**: `#FF6B9D` - Pink
- **Tertiary**: `#4ECDC4` - Teal

## Project Structure

```
snip/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main page
│   │   └── providers.tsx       # Theme provider wrapper
│   ├── components/
│   │   ├── Layout.tsx          # Split-screen layout components
│   │   └── sections/
│   │       ├── Home.tsx        # Hero section
│   │       ├── About.tsx       # About section
│   │       ├── Projects.tsx    # Projects showcase
│   │       ├── Skills.tsx      # Skills grid
│   │       └── Contact.tsx     # Contact information
│   ├── lib/
│   │   └── registry.tsx        # styled-components SSR registry
│   └── styles/
│       ├── theme.ts            # Theme configuration
│       ├── GlobalStyles.ts     # Global styles
│       └── styled.d.ts         # TypeScript definitions
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd snip
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page will auto-update as you edit files.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run the linter:

```bash
npm run lint
```

## Sections

### Home (Left Panel)
- Hero section with main introduction
- Sticky positioning on desktop
- Collapses to top section on mobile

### About (Right Panel)
- Personal introduction
- Background information

### Projects (Right Panel)
- Grid of project cards
- Hover animations
- Ready for GSAP scroll animations

### Skills (Right Panel)
- Icon grid showcasing technical skills
- Interactive hover states
- Includes: Java, Spring, PostgreSQL, MySQL, JavaScript, HTML5, CSS3, React, Python, Bash, Git, Postman

### Contact (Right Panel)
- Social media links with icons
- Email, GitHub, LinkedIn, Twitter
- Hover animations

## Customization

### Theme

Edit `src/styles/theme.ts` to customize colors, spacing, typography, and breakpoints.

### Global Styles

Modify `src/styles/GlobalStyles.ts` to change global CSS rules.

### Fonts

Fonts are configured in `src/app/layout.tsx`. Currently using:
- Spline Sans Mono (mono-spaced)
- Inter (sans-serif)

To change fonts, update the imports from `next/font/google`.

### Layout Grid

The split-screen layout is configured in `src/components/Layout.tsx`:
- Desktop: 40% left, 60% right
- Tablet/Mobile: Stacked single column

Adjust the grid template columns to change the split ratio.

## Adding GSAP Animations

GSAP is already installed. To add animations:

1. Import GSAP in your component:
```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

2. Use `useEffect` or `useLayoutEffect` for animations:
```tsx
useEffect(() => {
  gsap.from('.element', {
    scrollTrigger: '.element',
    y: 50,
    opacity: 0,
    duration: 1
  });
}, []);
```

## Adding Smooth Scrolling

Lenis is included for smooth scrolling. To implement:

1. Create a smooth scroll component
2. Initialize Lenis in a client component
3. Use with GSAP ScrollTrigger for synchronized animations

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Open source and available for personal and commercial use.

---

Built with Next.js and styled-components
