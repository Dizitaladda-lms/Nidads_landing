/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nidads: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#46d9ff',
          500: '#38b6ff', // NIDADS Primary Electric Cyan
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          blue: '#5478ff',
          cyan: '#46d9ff',
          gold: '#f59e0b',
          amber: '#ffbf5f',
          lime: '#92ee22',
        },
        navy: {
          bg: '#050b14',      // Deep space navy
          surface: '#07111e', // NIDADS primary card background
          card: '#0c1b2f',    // Raised card surface
          border: '#152d4e',  // Subtle cyan-tinted border
          muted: '#8ba2c4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        }
      }
    },
  },
  plugins: [],
};
