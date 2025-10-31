# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Installation

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install
```

## 📧 Configure EmailJS (Required)

The contact form needs EmailJS to work. Here's the fastest way to set it up:

### 1. Get EmailJS Credentials

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up (it's free!)
2. Add an email service (Gmail is easiest)
3. Create a template with these variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Get your **Service ID**, **Template ID**, and **Public Key**

### 2. Add to .env File

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

> Need help? See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions.

## 🎨 Customize

### Update Contact Information

Edit `src/components/sections/Contact.tsx`:

```typescript
// Change email addresses
<a href="mailto:your-email@example.com">
  your-email@example.com
</a>

// Update social links
<a href="https://github.com/yourusername" ...>
```

### Change Colors

Edit `src/index.css` to modify the color scheme:

```css
:root {
  --background: 262 13% 21%;    /* Dark purple */
  --foreground: 0 0% 98%;       /* White text */
  /* ... more colors */
}
```

### Customize Content

- **Hero Section**: `src/components/sections/Hero.tsx`
- **About Section**: `src/components/sections/About.tsx`
- **Skills**: `src/components/sections/Skills.tsx`
- **Projects**: `src/components/sections/Projects.tsx`
- **Contact**: `src/components/sections/Contact.tsx`

## 🏃 Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 📤 Deploy

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Site settings → Environment

### GitHub Pages

```bash
npm run build
# Copy dist/ contents to your gh-pages branch
```

> **Important**: Add environment variables to your deployment platform!

## 🔧 Common Issues

### Contact form shows error

**Problem**: "EmailJS is not configured" message

**Solution**: Make sure you've created a `.env` file with your EmailJS credentials and restarted the dev server.

### Styles not loading

**Problem**: Page looks unstyled

**Solution**: Run `npm install` to ensure Tailwind CSS is installed.

### Build errors

**Problem**: TypeScript or build errors

**Solution**: 
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [EmailJS Setup](./EMAILJS_SETUP.md) - Detailed email configuration
- [GSAP Documentation](https://greensock.com/docs/) - Animation library

## 🆘 Need Help?

1. Check the [README.md](./README.md) for detailed documentation
2. Review browser console for error messages
3. Verify `.env` file has correct EmailJS credentials
4. Make sure you've run `npm install`

## ✨ Next Steps

1. ✅ Install dependencies
2. ✅ Configure EmailJS
3. ✅ Run dev server
4. 🎨 Customize content
5. 📸 Add your projects
6. 🚀 Deploy to production

Happy coding! 🎉
