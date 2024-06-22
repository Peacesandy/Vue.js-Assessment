/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cowrywise: '#0055FF',
        brandcolor: '#022b69'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

