// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// User-site repo (JoaoZPalma.github.io) -> served at domain root, no base path.
export default defineConfig({
  site: 'https://joaozpalma.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
