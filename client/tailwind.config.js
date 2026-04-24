/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#eeeee9',
          200: '#d9d9cf',
          300: '#b8b8a8',
          400: '#93937f',
          500: '#767663',
          600: '#5e5e4e',
          700: '#4d4d40',
          800: '#424237',
          900: '#3a3a30',
          950: '#1e1e18',
        },
        accent: '#e85d2f',
      },
      animation: {
        'slide-in': 'slideIn 0.25s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'strike': 'strike 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
