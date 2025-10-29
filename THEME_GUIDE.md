# 🎨 Hope Clinic Theme System Documentation

## Overview

The Hope Clinic PWA uses a **centralized theme configuration system** that allows you to control the entire visual design from a single file: `/app/theme.config.js`

This makes it easy to:
- ✅ Change colors across the entire application
- ✅ Adjust spacing, typography, and effects globally
- ✅ Switch between preset themes instantly
- ✅ Maintain consistent design throughout the app
- ✅ Create custom themes without touching individual components

---

## 📁 Theme System Architecture

```
/app/
├── theme.config.js          # 🎨 CENTRAL THEME FILE (Edit here!)
├── client/
│   ├── tailwind.config.js   # Imports from theme.config.js
│   └── src/
│       └── index.css        # Global styles using theme values
```

---

## 🎯 Quick Start: How to Change the Theme

### 1️⃣ Change Primary Colors

Open `/app/theme.config.js` and edit the color palette:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',   // 👈 Change this to your brand color
    // ...
  },
}
```

**Example: Change to Green theme**
```javascript
primary: {
  500: '#10b981',  // Green
}
```

### 2️⃣ Change Secondary Colors

```javascript
colors: {
  secondary: {
    500: '#a855f7',  // 👈 Change this
  },
}
```

### 3️⃣ Change Hero Gradient

```javascript
gradients: {
  aurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // 👆 This controls the hero section background
}
```

### 4️⃣ Apply Preset Themes

Use one of the built-in preset themes:

```javascript
// In theme.config.js, copy colors from presetThemes:
export const presetThemes = {
  professional: {
    primary: '#0f766e',    // Teal
    secondary: '#0891b2',  // Cyan
    accent: '#f59e0b',     // Amber
  },
  // Copy these values to the main colors section
}
```

---

## 🎨 Complete Customization Guide

### Colors

The theme includes 7 color palettes, each with 10 shades (50-950):

```javascript
colors: {
  primary: { /* Blue/Teal shades */ },
  secondary: { /* Purple shades */ },
  accent: { /* Red/Pink shades */ },
  success: { /* Green shades */ },
  warning: { /* Orange/Yellow shades */ },
  error: { /* Red shades */ },
  neutral: { /* Gray shades */ },
}
```

**Usage in Components:**
```jsx
// In your React components:
<div className="bg-primary-500 text-white">Hello</div>
<button className="bg-secondary-600 hover:bg-secondary-700">Click</button>
```

**Usage in CSS:**
```css
.my-element {
  background-color: theme('colors.primary.500');
  color: theme('colors.white');
}
```

---

### Typography

Control all text styling from the theme:

```javascript
typography: {
  fonts: {
    sans: '...',      // Body text
    serif: '...',     // Alternative font
    mono: '...',      // Code blocks
    display: '...',   // Headings
  },
  sizes: {
    xs: '0.75rem',
    // ... up to 9xl
  },
  weights: {
    thin: '100',
    // ... up to black: '900'
  },
}
```

**Usage:**
```jsx
<h1 className="font-display text-5xl font-bold">Heading</h1>
<p className="text-base font-normal">Body text</p>
<code className="font-mono text-sm">Code</code>
```

---

### Gradients

Pre-defined gradients for backgrounds:

```javascript
gradients: {
  primary: 'linear-gradient(...)',
  aurora: 'linear-gradient(...)',
  sunset: 'linear-gradient(...)',
  // ... 8 gradients total
}
```

**Usage:**
```jsx
<div className="bg-gradient-aurora">Aurora gradient</div>
<div className="bg-gradient-sunset">Sunset gradient</div>
```

Or in CSS:
```css
.my-hero {
  background: theme('backgroundImage.gradient-aurora');
}
```

---

### Spacing & Sizing

Consistent spacing throughout the app:

```javascript
spacing: {
  0: '0px',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  // ... up to 64: '16rem'
}
```

**Usage:**
```jsx
<div className="p-6 m-4 space-y-8">Content</div>
<div className="mt-12 mb-16">More content</div>
```

---

### Border Radius

Rounded corners:

```javascript
borderRadius: {
  none: '0',
  sm: '0.125rem',
  // ... up to full: '9999px'
}
```

**Usage:**
```jsx
<div className="rounded-lg">Rounded large</div>
<button className="rounded-full">Pill button</button>
```

---

### Shadows

Depth and elevation:

```javascript
shadows: {
  sm: '0 1px 2px ...',
  // ... up to 2xl
  primaryGlow: '0 10px 40px rgba(...)',  // Colored glow
}
```

**Usage:**
```jsx
<div className="shadow-lg">Card with shadow</div>
<button className="shadow-primaryGlow">Glowing button</button>
```

---

## 🎨 Pre-built CSS Classes

The theme system provides ready-to-use CSS classes:

### Buttons
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-accent">Accent Button</button>
<button className="btn-success">Success Button</button>
<button className="btn-ghost">Ghost Button</button>
```

### Cards
```jsx
<div className="card">Regular card</div>
<div className="card-hover">Hoverable card</div>
<div className="card-gradient">Gradient card</div>
<div className="glass-card">Glass effect card</div>
```

### Text Effects
```jsx
<h1 className="gradient-text">Gradient Text</h1>
<h2 className="gradient-text-primary">Primary Gradient</h2>
```

### Form Elements
```jsx
<input className="input" />
<textarea className="textarea"></textarea>
<select className="select"></select>
<input type="checkbox" className="checkbox" />
```

### Badges
```jsx
<span className="badge-primary">Primary Badge</span>
<span className="badge-success">Success Badge</span>
<span className="badge-warning">Warning Badge</span>
```

### Alerts
```jsx
<div className="alert-success">Success message</div>
<div className="alert-warning">Warning message</div>
<div className="alert-error">Error message</div>
<div className="alert-info">Info message</div>
```

---

## 🔄 How to Switch to a Preset Theme

### Method 1: Manual Copy

1. Open `/app/theme.config.js`
2. Choose a preset from `presetThemes` (bottom of file)
3. Copy the color values
4. Paste into the main `colors` section
5. Save and restart the frontend

### Method 2: Create Custom Preset

Add your own preset to the `presetThemes` object:

```javascript
export const presetThemes = {
  // ... existing themes
  
  myCustomTheme: {
    name: 'My Brand',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
  },
};
```

---

## 🎯 Common Customization Scenarios

### Scenario 1: Match Your Brand Colors

```javascript
// 1. Replace primary color
colors.primary[500] = '#YOUR_BRAND_COLOR';

// 2. Update gradient to match
gradients.primary = 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)';

// 3. Update hero gradient
gradients.aurora = 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)';
```

### Scenario 2: Change Typography

```javascript
typography: {
  fonts: {
    sans: '"Inter", -apple-system, sans-serif',
    display: '"Playfair Display", serif',
  },
}
```

### Scenario 3: Adjust Button Styles

Edit in `/app/client/src/index.css`:

```css
.btn-primary {
  @apply px-8 py-4 rounded-2xl;  /* Larger, more rounded */
}
```

### Scenario 4: Change Card Styling

```javascript
// In theme.config.js
clinic: {
  card: {
    borderRadius: '1.5rem',  // More rounded
    shadow: '0 20px 40px rgba(0, 0, 0, 0.15)',  // Deeper shadow
  },
}
```

---

## 📱 Responsive Design

The theme includes responsive breakpoints:

```javascript
breakpoints: {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

**Usage:**
```jsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text size
</div>
```

---

## ✨ Animations

Pre-configured animations:

```jsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-slide-up">Slide up</div>
<div className="animate-float">Floating effect</div>
<div className="animate-pulse-slow">Slow pulse</div>
```

---

## 🔧 Advanced: Using Theme in JavaScript

Import and use theme values in your React components:

```javascript
import themeConfig from '../../../theme.config.js';

function MyComponent() {
  const primaryColor = themeConfig.colors.primary[500];
  
  return (
    <div style={{ backgroundColor: primaryColor }}>
      Dynamic color
    </div>
  );
}
```

---

## 🎨 Theme Utility Functions

Use the built-in utility functions:

```javascript
import { getColor, getSpacing, getShadow } from './theme.config.js';

const myColor = getColor('primary.500');
const mySpacing = getSpacing(4);
const myShadow = getShadow('lg');
```

---

## 📝 Best Practices

1. ✅ **Always edit** `/app/theme.config.js` for theme changes
2. ✅ **Use theme classes** instead of inline styles
3. ✅ **Test in both light and dark modes** after changes
4. ✅ **Restart the frontend** after theme changes
5. ✅ **Use CSS variables** for dynamic theming
6. ❌ **Avoid hardcoding colors** in components
7. ❌ **Don't edit Tailwind config** directly for colors

---

## 🔄 Applying Changes

After editing the theme:

```bash
# Restart the frontend to see changes
sudo supervisorctl restart frontend

# Or restart all services
sudo supervisorctl restart all
```

---

## 📚 Examples

### Example 1: Create a Dark Purple Theme

```javascript
colors: {
  primary: {
    500: '#7c3aed',  // Violet
  },
  secondary: {
    500: '#ec4899',  // Pink
  },
}

gradients: {
  aurora: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
}
```

### Example 2: Professional Blue-Gray Theme

```javascript
colors: {
  primary: {
    500: '#0f766e',  // Teal
  },
  secondary: {
    500: '#475569',  // Slate
  },
}

gradients: {
  aurora: 'linear-gradient(135deg, #0f766e 0%, #475569 100%)',
}
```

---

## 🆘 Troubleshooting

**Theme changes not appearing?**
1. Clear browser cache (Ctrl+Shift+R)
2. Restart frontend: `sudo supervisorctl restart frontend`
3. Check browser console for errors

**Colors look wrong in dark mode?**
- Adjust the dark mode variants in the color palette (700-900 shades)

**Gradient not updating?**
- Make sure to update BOTH `colors` and `gradients` sections

---

## 📞 Need Help?

For theme customization support, contact: vijay.paliwal@outlook.com

---

**Pro Tip:** Keep a backup of your original theme before making major changes!
