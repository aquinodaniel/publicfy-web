/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aurora: {
          DEFAULT: '#00657B',
          dark: '#004F60',
          light: '#0A8AA8',
          glow: '#13B8D9'
        },
        ink: {
          DEFAULT: '#001115',
          soft: '#001B22',
          deep: '#000A0E'
        },
        paper: {
          DEFAULT: '#FAFAF7',
          warm: '#F4F1E8'
        },
        alert: '#DBBE7C',
        cota: '#7A8B91',
        gray: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          500: '#4A4A4A',
          900: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        glow: '0 0 80px rgba(0,101,123,.35)',
        cta: '0 12px 32px rgba(0,101,123,.45), 0 4px 12px rgba(0,101,123,.25)',
        stamp: '0 2px 0 rgba(0,17,21,.06), 0 8px 24px rgba(0,17,21,.06)',
        'inner-tech': 'inset 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px rgba(0,101,123,.15)'
      },
      backgroundImage: {
        'paper-grid': 'linear-gradient(rgba(0,101,123,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,101,123,.05) 1px, transparent 1px)',
        'blueprint-grid': 'linear-gradient(rgba(19,184,217,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(19,184,217,.07) 1px, transparent 1px)',
        'paper-dots': 'radial-gradient(rgba(0,101,123,.10) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '48px 48px',
        'grid-lg': '80px 80px',
        'dots-md': '20px 20px'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' }
        },
        liveDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.4', transform: 'scale(.85)' }
        },
        drawLine: {
          '0%': { strokeDashoffset: '300' },
          '100%': { strokeDashoffset: '0' }
        },
        flow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-40' }
        },
        gridDrift: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '48px 48px, 48px 48px' }
        },
        stampIn: {
          '0%': { opacity: '0', transform: 'scale(1.4) rotate(-12deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-6deg)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        'live-dot': 'liveDot 1.4s ease-in-out infinite',
        'draw-line': 'drawLine 1.2s ease-out forwards',
        'flow-fast': 'flow 1.2s linear infinite',
        'flow-slow': 'flow 3s linear infinite',
        'grid-drift': 'gridDrift 60s linear infinite',
        'stamp-in': 'stampIn .5s cubic-bezier(.34,1.56,.64,1) forwards'
      }
    }
  },
  plugins: []
};
