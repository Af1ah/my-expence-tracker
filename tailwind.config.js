
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}','./src/types/**/*.{js,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom colors for your app
        primary: {
          light: '#4c66ef',
          dark: '#6366f1',
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        card: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
        text: {
          primary: {
            light: '#1f2937',
            dark: '#f1f5f9',
          },
          secondary: {
            light: '#6b7280',
            dark: '#94a3b8',
          }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class', // Enable class-based dark mode
}