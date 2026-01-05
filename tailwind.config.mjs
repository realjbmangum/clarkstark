/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff6154',
          peach: '#ffb088',
          pink: '#ffd1dc',
        }
      }
    },
  },
  plugins: [],
}
