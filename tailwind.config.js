/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#1A1A1A',
      },
      fontFamily: {
        sans: ['var(--font-forum)', 'system-ui', 'serif'],
        forum: ['var(--font-forum)', 'serif'],
        bonVivant: ['var(--font-bon-vivant)', 'serif'],
        casta: ['var(--font-casta)', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
