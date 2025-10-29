/**
 * 🎨 HOPE CLINIC - CENTRAL THEME CONFIGURATION
 * 
 * This file controls the entire visual theme of the application.
 * Modify values here to instantly update the design across the entire project.
 */

export const themeConfig = {
  // ============================================
  // 🎨 COLOR PALETTE
  // ============================================
  colors: {
    // Primary Brand Colors (Main theme color)
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',   // Main primary color
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    
    // Secondary Brand Colors
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',   // Main secondary color
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    
    // Accent Colors (Highlights, CTAs)
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',   // Main accent color
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    
    // Success Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',   // Main success color
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Warning Colors
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',   // Main warning color
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Error Colors
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',   // Main error color
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    // Neutral Colors (Grays)
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
  },

  // ============================================
  // 🌈 GRADIENT CONFIGURATIONS
  // ============================================
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    aurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ocean: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
    fire: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    forest: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
    royal: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)',
  },

  // ============================================
  // 📝 TYPOGRAPHY
  // ============================================
  typography: {
    // Font Families
    fonts: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      display: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    
    // Font Sizes
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },
    
    // Font Weights
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Line Heights
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // ============================================
  // 📏 SPACING & SIZING
  // ============================================
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  // ============================================
  // 🔘 BORDER RADIUS
  // ============================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // ============================================
  // 🌟 SHADOWS
  // ============================================
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    
    // Colored shadows
    primaryGlow: '0 10px 40px -10px rgba(102, 126, 234, 0.6)',
    secondaryGlow: '0 10px 40px -10px rgba(168, 85, 247, 0.6)',
    accentGlow: '0 10px 40px -10px rgba(239, 68, 68, 0.6)',
  },

  // ============================================
  // ✨ ANIMATIONS
  // ============================================
  animations: {
    // Duration
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    
    // Easing functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // ============================================
  // 📱 BREAKPOINTS
  // ============================================
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ============================================
  // 🎭 EFFECTS
  // ============================================
  effects: {
    // Blur amounts
    blur: {
      sm: '4px',
      base: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
    },
    
    // Opacity values
    opacity: {
      0: '0',
      5: '0.05',
      10: '0.1',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      80: '0.8',
      90: '0.9',
      95: '0.95',
      100: '1',
    },
  },

  // ============================================
  // 🏥 CLINIC SPECIFIC STYLES
  // ============================================
  clinic: {
    // Button styles
    buttons: {
      primary: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        hoverBg: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
        text: '#ffffff',
        shadow: '0 10px 40px -10px rgba(102, 126, 234, 0.6)',
      },
      secondary: {
        bg: '#ffffff',
        hoverBg: '#f5f5f5',
        text: '#0ea5e9',
        border: '#0ea5e9',
      },
    },
    
    // Card styles
    card: {
      bg: '#ffffff',
      darkBg: '#1f2937',
      shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      hoverShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      borderRadius: '1rem',
    },
    
    // Hero section
    hero: {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      overlayOpacity: '0.1',
    },
  },
};

// ============================================
// 🎨 PRESET THEMES (Alternative color schemes)
// ============================================
export const presetThemes = {
  // Default Hope Clinic theme (Blue/Purple)
  default: {
    name: 'Hope Clinic',
    primary: '#0ea5e9',
    secondary: '#a855f7',
    accent: '#ef4444',
  },
  
  // Professional theme (Navy/Teal)
  professional: {
    name: 'Professional',
    primary: '#0f766e',
    secondary: '#0891b2',
    accent: '#f59e0b',
  },
  
  // Warm theme (Orange/Red)
  warm: {
    name: 'Warm & Welcoming',
    primary: '#ea580c',
    secondary: '#dc2626',
    accent: '#facc15',
  },
  
  // Nature theme (Green/Blue)
  nature: {
    name: 'Natural Healing',
    primary: '#16a34a',
    secondary: '#0284c7',
    accent: '#84cc16',
  },
  
  // Elegant theme (Purple/Pink)
  elegant: {
    name: 'Elegant',
    primary: '#9333ea',
    secondary: '#ec4899',
    accent: '#f43f5e',
  },
};

// ============================================
// 🛠️ UTILITY FUNCTIONS
// ============================================
export const getColor = (colorPath) => {
  const keys = colorPath.split('.');
  let value = themeConfig.colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};

export const getSpacing = (size) => themeConfig.spacing[size];
export const getShadow = (size) => themeConfig.shadows[size];
export const getBorderRadius = (size) => themeConfig.borderRadius[size];

export default themeConfig;
