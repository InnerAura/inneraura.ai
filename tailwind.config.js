/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HyperWeave colors
        'hyperweave-red': '#FF0000',
        'hyperweave-blue': '#0000FF',
        'hyperweave-yellow': '#FFFF00',
        'hyperweave-cyan': '#00FFFF',
        'hyperweave-magenta': '#FF00FF',
        'hyperweave-holographic': '#FF0080',
        // Constructivist colors
        'constructivist-red': '#FD413C',
        'constructivist-blue': '#00539C',
        'constructivist-yellow': '#FDB813',
        'constructivist-cream': '#F0E6D2',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}