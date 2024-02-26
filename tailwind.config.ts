import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-lora)'],
        mono: ['var(--font-inconsolata)'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          'md': '2.5rem',
          'xl': '22rem'
        },
      },
    },
  },
  plugins: [],
};
export default config;
