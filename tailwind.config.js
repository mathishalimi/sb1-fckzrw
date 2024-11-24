/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        text: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
          light: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}