import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        'zptx-dark': '#0e061e',
        'zptx-orange': '#fc5506',
      }
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [
    daisyui,
  ],
}

