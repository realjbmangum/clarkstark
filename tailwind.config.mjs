/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#cc5500',
          peach: '#e87d3e',
          pink: '#ffd1dc',
        }
      }
    },
  },
  plugins: [],
}
