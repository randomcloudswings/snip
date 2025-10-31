# Animated Portfolio Website

A visually stunning, animation-heavy portfolio website built with React, GSAP, ShadCN UI, featuring custom cursor, parallax effects, and animated backgrounds.

## 🚀 Features

- **GSAP Animations**: Smooth, professional animations throughout using GreenSock Animation Platform
- **ScrollTrigger**: Scroll-based animations that reveal content as you navigate
- **Custom Cursor**: Interactive cursor that responds to hover states with GSAP animations
- **Animated Background**: Particle system with floating animations
- **Parallax Effects**: Depth and visual interest through parallax scrolling
- **ShadCN UI Components**: Beautiful, accessible UI components with Tailwind CSS
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS

## 🎨 Color Palette

The site uses a carefully curated color scheme:

- **#37353E** - Dark purple-gray (primary background)
- **#44444E** - Medium gray (cards, secondary elements)
- **#715A5A** - Muted rose-brown (accents, hover states)
- **#D3DAD9** - Light gray-blue (text, foreground)

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **ScrollTrigger** - Scroll-based animations
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Component library
- **Lucide React** - Icon library

## 📦 Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
snip/
├── src/
│   ├── components/
│   │   ├── ui/              # ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── CustomCursor.tsx
│   │   └── Navigation.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 📱 Sections

### 1. Hero
- Eye-catching title with gradient text
- Smooth fade-in animations
- Call-to-action buttons with smooth scrolling

### 2. About
- Four-card grid layout
- Scroll-triggered animations
- Parallax effects on cards

### 3. Skills
- 12 technology skills displayed in a grid:
  - Java, Spring, Postgres, MySQL
  - JavaScript, HTML5, CSS3, React
  - Python, Bash Script, Git, Postman
- Animated hover effects with scale and movement
- Staggered entrance animations

### 4. Projects
- Six featured projects in a responsive grid
- Parallax scrolling effects (alternating directions)
- Tags and action buttons for each project

### 5. Contact
- Email and social media links
- Smooth reveal animations
- Interactive buttons with hover effects

## 🎭 Animation Features

### GSAP Animations
- **Hero Section**: Staggered fade-in of title, subtitle, and buttons
- **Scroll Triggers**: Each section animates in when scrolling into view
- **Parallax**: Cards move at different speeds while scrolling
- **Hover Effects**: Scale, translate, and color transitions on interactive elements

### Custom Cursor
- Follows mouse movement with smooth GSAP easing
- Expands on hover over interactive elements
- Dual-layer design (main cursor + dot)

### Animated Background
- 50 floating particles with random movements
- Individual opacity animations
- Gradient background with smooth color transitions

## 🎯 Performance Optimizations

- Lazy-loaded animations with ScrollTrigger
- GPU-accelerated transforms
- Efficient particle system
- Optimized re-renders with React hooks
- Cleanup functions to prevent memory leaks

## 📝 Customization

### Changing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --background: 215 20% 22%;
  --foreground: 180 5% 82%;
  /* ... other colors */
}
```

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add GSAP animations with ScrollTrigger
3. Import and add to `App.tsx`
4. Update navigation in `Navigation.tsx`

### Modifying Animations

All animations use GSAP. Adjust timing, easing, and effects in each component's `useEffect` hook.

## 🚀 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🌐 Deployment

Deploy to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Configure in repository settings

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Animated with [GSAP](https://greensock.com/gsap/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [ShadCN UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Happy Coding! 🎨✨**
