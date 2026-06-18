import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FCF1EE',
        'bg-alt': '#FFFFFF',
        surface: '#D9CFCC',
        ink: '#020101',
        wine: '#963845',
        bordo: '#4F0911',
        peach: '#FFBC7D',
        accent: '#000000',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.04em',
        tight: '-0.015em',
        wider2: '0.18em',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.6, 0.05, 0.1, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
