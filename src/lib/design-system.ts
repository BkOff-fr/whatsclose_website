export const DESIGN = {
  colors: {
    // Palette inspirée de l'exemple
    ocre: '#CC7722',
    foret: '#224229',
    creme: '#F5F5DC',

    // Variantes
    ocreLight: '#D4892A',
    ocreDark: '#B8661A',
    foretLight: '#2A5232',
    foretDark: '#1A3320',
    cremeLight: '#FAFAF5',
    cremeDark: '#E8E8D0'
  },

  typography: {
    fonts: {
      display: "'Clash Display', sans-serif",
      body: "'Satoshi', sans-serif"
    },
    sizes: {
      hero: 'clamp(3rem, 8vw, 8rem)',
      title: 'clamp(2.5rem, 6vw, 5rem)',
      subtitle: 'clamp(1.5rem, 3vw, 2.5rem)',
      body: 'clamp(1rem, 2vw, 1.25rem)',
      caption: 'clamp(0.875rem, 1.5vw, 1rem)'
    }
  },

  spacing: {
    section: 'clamp(5rem, 10vw, 10rem)',
    element: 'clamp(1rem, 3vw, 2rem)',
    micro: 'clamp(0.5rem, 1vw, 1rem)'
  },

  transitions: {
    smooth: '0.3s ease',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: '0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }
} as const;