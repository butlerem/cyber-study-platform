import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        primary: '#000000',
        secondary: '#111111',
        accent: '#FFFFFF',
        'accent-hover': '#E5E5E5',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.3rem',
            },
            h2: {
              fontSize: '1.1rem',
            },
            h3: {
              fontSize: '1.0rem',
            },
            p: {
              fontSize: '0.8rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
