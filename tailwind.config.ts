import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'text-gray': 'var(--color-text-gray)',
      },
    },
  },
  plugins: [],
} satisfies Config;

