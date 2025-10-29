import themeConfig from '../theme.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Import colors from central theme config
      colors: {
        primary: themeConfig.colors.primary,
        secondary: themeConfig.colors.secondary,
        accent: themeConfig.colors.accent,
        success: themeConfig.colors.success,
        warning: themeConfig.colors.warning,
        error: themeConfig.colors.error,
        neutral: themeConfig.colors.neutral,
      },
      
      // Import font families
      fontFamily: {
        sans: themeConfig.typography.fonts.sans.split(', '),
        serif: themeConfig.typography.fonts.serif.split(', '),
        mono: themeConfig.typography.fonts.mono.split(', '),
        display: themeConfig.typography.fonts.display.split(', '),
      },
      
      // Import spacing
      spacing: themeConfig.spacing,
      
      // Import border radius
      borderRadius: themeConfig.borderRadius,
      
      // Import shadows
      boxShadow: {
        ...themeConfig.shadows,
      },
      
      // Import blur effects
      blur: themeConfig.effects.blur,
      
      // Import opacity
      opacity: themeConfig.effects.opacity,
      
      // Import breakpoints
      screens: themeConfig.breakpoints,
      
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Background images (gradients from theme)
      backgroundImage: {
        'gradient-primary': themeConfig.gradients.primary,
        'gradient-secondary': themeConfig.gradients.secondary,
        'gradient-aurora': themeConfig.gradients.aurora,
        'gradient-sunset': themeConfig.gradients.sunset,
        'gradient-ocean': themeConfig.gradients.ocean,
        'gradient-fire': themeConfig.gradients.fire,
        'gradient-forest': themeConfig.gradients.forest,
        'gradient-royal': themeConfig.gradients.royal,
      },
    },
  },
  plugins: [],
}
