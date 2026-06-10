// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Served at the apex custom domain (public/CNAME + Pages settings), no base path.
export default defineConfig({
  site: 'https://joaopalma.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
