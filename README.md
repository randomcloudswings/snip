# Animation-Heavy Portfolio Website

A visually stunning, animation-heavy portfolio website built with GSAP (GreenSock Animation Platform) featuring parallax scrolling effects, custom cursor interactions, and smooth transitions throughout.

## Features

- **Heavy GSAP Animations**: Extensive use of GSAP for smooth, professional animations
- **Parallax Scrolling**: Multiple parallax layers for depth and visual interest
- **Custom Cursor**: Interactive custom cursor that follows mouse movement
- **Animated Background**: Continuously animated gradient orbs
- **Smooth Scrolling**: Seamless scroll experience with smooth transitions
- **Fully Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Glassmorphism UI**: Modern frosted glass effects with backdrop filters
- **Mobile Navigation**: Animated collapsible menu with hamburger toggle
- **Social Sidebar**: Fixed social media links with hover animations (desktop only)
- **Accessibility First**: Full keyboard navigation and reduced-motion support
- **Touch Optimized**: Enhanced touch interactions for mobile devices
- **Performance Optimized**: Smooth 60fps animations with reduced-motion fallbacks

## Color Palette

- **#37353E** - Dark purple-gray (main background)
- **#44444E** - Medium gray (secondary elements)
- **#715A5A** - Muted rose-brown (accent color)
- **#D3DAD9** - Light gray-blue (text color)

## Sections

1. **Hero Section** - Eye-catching landing with animated title and CTAs
2. **About Section** - Introduction with animated statistics and parallax image
3. **Skills Section** - Showcase of technical skills with hover animations
   - Java
   - Spring
   - Postgres
   - MySQL
   - JavaScript
   - HTML5
   - CSS3
   - React
   - Python
   - Bash Script
   - Git
   - Postman
4. **Projects Section** - Featured project cards with parallax effects
5. **Contact Section** - Contact form and information with smooth animations

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Interactive functionality
- **GSAP 3.12.5** - Animation library
  - ScrollTrigger plugin for scroll-based animations
  - ScrollToPlugin for smooth scrolling navigation
- **Google Fonts** - Inter and Playfair Display fonts

## Local Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local web server (for best performance)

### Installation & Running

#### Method 1: Direct File Opening (Simple)

1. Clone or download this repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

#### Method 2: Using Python HTTP Server (Recommended)

```bash
# Navigate to project directory
cd /path/to/project

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and visit: `http://localhost:8000`

#### Method 3: Using Node.js HTTP Server

```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project directory
cd /path/to/project

# Start server
http-server -p 8000
```

Then open your browser and visit: `http://localhost:8000`

#### Method 4: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and responsive design
├── script.js           # GSAP animations and interactive features
└── README.md           # Documentation
```

## Animation Features

### Hero Section
- Staggered title animation
- Floating shapes with continuous movement
- Pulsing scroll indicator
- Parallax on scroll

### About Section
- Slide-in animations from both sides
- Animated statistics counter
- Parallax image effect
- Image wrapper rotation on scroll

### Skills Section
- Grid animation with stagger effect
- Hover interactions with scale and rotation
- Continuous floating animation
- Card flip on hover

### Projects Section
- Fade-up animation with stagger
- Parallax project images
- Hover effects with overlay animation
- Smooth title slide

### Contact Section
- Split content animation
- Form field focus effects
- Button interaction feedback
- Contact item stagger animation

### Global Effects
- Custom cursor with smooth following
- Animated background gradients
- Hide/show navigation on scroll
- Smooth scroll to anchor links
- Parallax on multiple elements
- Fixed social sidebar with animated entrance
- Mobile menu overlay with backdrop blur
- Page and section fade-in transitions
- Glassmorphism depth effects throughout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- All animations run at 60fps on modern hardware
- GSAP's ScrollTrigger is optimized for performance
- Custom cursor disabled on mobile devices
- Reduced animations on smaller screens where appropriate
- **Accessibility**: Respects `prefers-reduced-motion` system preference
- Glassmorphism effects use hardware-accelerated backdrop filters
- Touch targets meet WCAG 2.1 minimum size requirements (44x44px)

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with Escape key to close mobile menu
- **Screen Reader Support**: ARIA labels on all interactive elements
- **Focus States**: Clear visible focus indicators on all interactive elements
- **Reduced Motion**: Heavy animations disabled when user prefers reduced motion
- **Touch Targets**: Minimum 44x44px touch targets for mobile accessibility
- **Color Contrast**: WCAG AA compliant color contrast ratios

## Responsive Breakpoints

- **Desktop**: 1024px and above - Full experience with all effects
- **Tablet**: 768px - 1024px - Scaled floating shapes, adapted layouts
- **Mobile**: Below 768px - Stacked layout, collapsible menu, hidden social sidebar
- **Small Mobile**: Below 480px - Further optimized spacing and typography

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-dark: #37353E;
    --color-medium: #44444E;
    --color-accent: #715A5A;
    --color-light: #D3DAD9;
}
```

### Modifying Animations

All animations are in `script.js`. GSAP makes it easy to adjust:

- **Duration**: Change the `duration` value
- **Easing**: Modify the `ease` property
- **Timing**: Adjust `delay` and `stagger` values

### Adding Content

Replace Lorem Ipsum text in `index.html` with your own content. The structure is semantic and easy to modify.

## Credits

- **GSAP** - Animation library by GreenSock
- **Google Fonts** - Inter and Playfair Display typefaces

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using GSAP and modern web technologies
