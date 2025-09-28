/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-clash)', 'sans-serif'],
        'body': ['var(--font-satoshi)', 'sans-serif'],
      },
      colors: {
        // Couleurs principales
        ocre: {
          DEFAULT: '#CC7722',
          light: '#D4892A',
          dark: '#B8661A',
        },
        foret: {
          DEFAULT: '#224229',
          light: '#2A5232',
          dark: '#1A3320',
        },
        creme: {
          DEFAULT: '#F5F5DC',
          light: '#FAFAF5',
          dark: '#E8E8D0',
        }
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 6vw, 4.5rem)',
        'title': 'clamp(2rem, 4vw, 3.5rem)',
        'subtitle': 'clamp(1.25rem, 2.5vw, 2rem)',
        'body-lg': 'clamp(1rem, 1.5vw, 1.125rem)',
        'caption': 'clamp(0.875rem, 1vw, 1rem)',
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 10rem)',
        'element': 'clamp(1rem, 3vw, 2rem)',
        'micro': 'clamp(0.5rem, 1vw, 1rem)',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}