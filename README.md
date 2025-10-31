# Portfolio Website

A modern, animated portfolio website built with React, TypeScript, GSAP, and Tailwind CSS. Features smooth scroll animations, an interactive P5.js background, custom cursor, and a fully accessible contact form with validation.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Advanced Animations**: GSAP-powered hero timeline, scroll-triggered reveals, and smooth transitions
- **Interactive Background**: P5.js particle system with ink-like effects
- **Custom Cursor**: Dynamic cursor that responds to hover states
- **Working Contact Form**: Validated form using react-hook-form + Zod with EmailJS integration
- **Fully Accessible**: WCAG-compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Motion Preferences**: Respects `prefers-reduced-motion` for accessibility

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- EmailJS account (free) - [Sign up here](https://www.emailjs.com/)

> 💡 **Quick Start**: See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide!

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS (Required for Contact Form)**
   
   The contact form uses [EmailJS](https://www.emailjs.com/) to send emails. Follow these steps:
   
   a. Create a free account at [EmailJS.com](https://www.emailjs.com/)
   
   b. Create an email service (Gmail, Outlook, etc.)
   
   c. Create an email template with the following variables:
      - `{{from_name}}` - Sender's name
      - `{{from_email}}` - Sender's email
      - `{{message}}` - Message content
      - `{{to_name}}` - Your name (optional)
   
   d. Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
   
   e. Add your EmailJS credentials to `.env`:
      ```env
      VITE_EMAILJS_SERVICE_ID=your_service_id
      VITE_EMAILJS_TEMPLATE_ID=your_template_id
      VITE_EMAILJS_PUBLIC_KEY=your_public_key
      ```
   
   > **Note**: The contact form will display an error if EmailJS is not configured.
   > 
   > **Detailed Guide**: See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for step-by-step instructions with screenshots.

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── sections/         # Page sections (Hero, About, Skills, Projects, Contact)
│   ├── ui/              # Reusable UI components (ShadCN-based)
│   ├── CustomCursor.tsx # Interactive cursor component
│   ├── InkBackground.tsx # P5.js particle background
│   └── Navigation.tsx   # Main navigation
├── hooks/               # Custom React hooks
│   ├── useReducedMotion.ts
│   ├── useParallax.ts
│   ├── useHoverAnimation.ts
│   ├── useScrollTrigger.ts
│   └── useGSAPTimeline.ts
├── utils/
│   └── animations.ts    # GSAP animation constants and helpers
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
└── App.tsx             # Main app component
```

## 🎨 Background & Cursor Approach

### P5.js Ink Background
The background uses P5.js to create an organic, flowing particle system:
- **Particle System**: 50 particles with Perlin noise-based movement
- **Trail Effect**: Particles leave fading trails creating ink-like visuals
- **Performance**: Optimized for 60fps with GPU acceleration
- **Accessibility**: Automatically pauses for users who prefer reduced motion

Implementation in `src/components/InkBackground.tsx`:
```typescript
// Particles use Perlin noise for organic movement
const vx = (noise(x * 0.01, y * 0.01, frameCount * 0.01) - 0.5) * speed
const vy = (noise(x * 0.01 + 1000, y * 0.01, frameCount * 0.01) - 0.5) * speed
```

### Custom Cursor
The custom cursor creates an enhanced user experience:
- **Smooth Following**: Uses GSAP for fluid cursor tracking
- **Hover States**: Expands on interactive elements (buttons, links)
- **Reduced Motion**: Falls back to native cursor when preferred
- **Touch Devices**: Hidden on touch-enabled devices

Implementation in `src/components/CustomCursor.tsx` uses GSAP's quickSetter for performance:
```typescript
const xSetter = gsap.quickSetter(cursorRef.current, 'x', 'px')
const ySetter = gsap.quickSetter(cursorRef.current, 'y', 'px')
```

## 🎬 GSAP Animations

### Hero Timeline
The hero section features a sequenced entrance animation:

```typescript
const timeline = gsap.timeline({
  defaults: { ease: 'expo.out' }
})

// Staggered text reveal with clip-path
timeline
  .to(lines, {
    duration: 1.2,
    y: 0,
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    stagger: 0.1,
  })
  // Subtitle fades in
  .to(subtitle, {
    duration: 0.6,
    opacity: 1,
    y: 0,
  }, '-=0.6')
  // CTA buttons scale in with bounce
  .to(buttons, {
    duration: 0.6,
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.05,
    ease: 'back.out(1.7)',
  }, '-=0.4')
```

### ScrollTrigger Reveals
All sections use GSAP ScrollTrigger for on-scroll animations:

```typescript
gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 60%',
    toggleActions: 'play none none reverse',
  }
}).to(element, {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: 'power2.out',
})
```

### Hover Effects
Interactive elements feature micro-interactions:
- **Button Hover**: Scale to 1.05 with power2.out easing
- **Card Hover**: Scale + shadow with 0.3s duration
- **Navigation Links**: Smooth scale on hover with GPU acceleration

## 📱 Responsive Design

Breakpoints follow Tailwind CSS defaults:
- `sm`: 640px - Small tablets
- `md`: 768px - Tablets and small laptops
- `lg`: 1024px - Desktops
- `xl`: 1280px - Large desktops

Key responsive features:
- Mobile-first navigation with slide-out menu
- Grid layouts adapt from 1 to 3 columns
- Typography scales with viewport (text-4xl md:text-6xl)
- Touch-friendly button sizes on mobile

## ♿ Accessibility Features

### Keyboard Navigation
- Full keyboard support with visible focus indicators
- Logical tab order through all interactive elements
- Dialog focus trapping with automatic focus management
- Escape key closes dialogs and mobile menu

### Screen Reader Support
- Semantic HTML5 sections with proper ARIA labels
- `aria-labelledby` connects headings to sections
- `aria-live` regions announce form validation errors
- `aria-hidden` on decorative icons
- Descriptive `aria-label` on icon-only buttons

### Motion Preferences
The site respects `prefers-reduced-motion`:
- Disables GSAP animations
- Removes smooth scrolling
- Hides custom cursor
- Shows instant state changes

### Form Accessibility
- Labels properly associated with inputs
- Real-time validation with error announcements
- Required fields clearly marked
- Loading states communicated to screen readers

## 📋 Contact Form

The contact form uses modern validation and EmailJS for email delivery:

### Form Validation
- **react-hook-form**: Efficient form state management
- **Zod**: Type-safe schema validation
- **Validation Rules**:
  - Name: Required, minimum 2 characters
  - Email: Required, valid email format
  - Message: Required, minimum 10 characters

### Email Integration
- **EmailJS**: Sends emails directly from the client-side
- Environment variables for secure configuration
- Template parameters:
  - `from_name`: Sender's name from form
  - `from_email`: Sender's email from form
  - `message`: Message content from form
  - `to_name`: Recipient name (customizable)

### UX Features
- Inline error messages with ARIA announcements
- Loading spinner during submission
- Success modal with GSAP animations
- Error handling with user-friendly messages
- Form reset after successful submission
- Accessible with keyboard navigation and screen readers

### EmailJS Template Example
Create a template in EmailJS with this structure:
```
New message from {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

## 🎯 Animation Patterns

### 1. Hero Timeline (Sequential)
- Dramatic entrance with staggered reveals
- Clip-path animation for text
- Bounce easing for CTAs
- Total duration: ~2.5 seconds

### 2. Scroll Reveals (Triggered)
- Fade-up animation (opacity + translateY)
- Staggered children for grid layouts
- Reverse on scroll up
- 0.6s duration with power2.out easing

### 3. Hover Effects (Interactive)
- Scale transforms (1.0 → 1.05)
- Shadow intensity increase
- 0.3s duration for responsiveness
- GPU acceleration with force3D

### 4. Form Submission (State-based)
- Button loading animation (spinner)
- Success modal entrance (scale + fade)
- Staggered content reveal in modal
- Sequential icon → text → button

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Important**: Never commit `.env` to version control. Use `.env.example` as a template.

### Tailwind Configuration
Custom theme defined in `tailwind.config.js`:
- HSL color variables for dark theme
- Custom animations
- Extended spacing scale
- Backdrop blur utilities

### TypeScript
Strict mode enabled with path aliases:
- `@/components` → `src/components`
- `@/hooks` → `src/hooks`
- `@/utils` → `src/utils`
- `@/lib` → `src/lib`

### Vite
Fast builds with:
- React plugin with Fast Refresh
- Path resolution for @ imports
- Optimized chunks for production
- Environment variable support with VITE_ prefix

## 📝 Changelog

### Animation Implementations

**v1.4.0 - Contact Form Polish** (Current)
- ✨ Integrated react-hook-form + Zod validation
- 📧 EmailJS integration for working contact form
- ✨ GSAP-powered success modal with staggered animations
- ✨ Loading states with spinner micro-interaction
- ✨ Error handling with user-friendly error dialog
- ♿ Enhanced form accessibility with ARIA attributes
- ♿ Added proper heading IDs across all sections
- ♿ Smooth scroll respects prefers-reduced-motion
- 🔒 Environment variables for secure EmailJS configuration

**v1.3.0 - Scroll Animations**
- ✨ ScrollTrigger reveals for all sections
- ✨ Parallax effects on background layers
- ✨ Staggered card animations
- 🎨 3D perspective on project cards

**v1.2.0 - Hero Timeline**
- ✨ Sequential hero entrance animation
- ✨ Clip-path text reveals
- ✨ Bounce easing on CTA buttons
- ⚡ GPU-accelerated transforms

**v1.1.0 - Interactive Elements**
- ✨ Custom cursor with hover states
- ✨ Button hover micro-interactions
- ✨ Card hover effects with scale + shadow
- ✨ Navigation link animations

**v1.0.0 - Foundation**
- 🎨 P5.js ink background with Perlin noise
- ♿ Reduced motion preferences
- 📱 Responsive design system
- 🎨 Dark theme with Tailwind CSS

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) - Animation library
- [P5.js](https://p5js.org/) - Creative coding library
- [ShadCN UI](https://ui.shadcn.com/) - UI component system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
