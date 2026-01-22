
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Sorbonne Paris Nord brand colors
        'uspn': {
          navy: '#1e3a5f',      // Primary navy blue
          blue: '#4a6fa5',      // Secondary blue
          gray: '#8b8680',      // Neutral gray
          beige: '#b5a896',     // Tertiary beige
          white: '#ffffff',     // Pure white
        },
        // Wireframe neutrals (keeping existing for consistency)
        'wireframe': {
          bg: '#f5f5f7',
          text: '#1f2933',
          secondary: '#9ca3af',
          border: '#e5e7eb',
        }
      }
    }
  }
}
