import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages project site — the built app will live at
  // https://<username>.github.io/zef4/, not at the domain root.
  // Every asset/script path Vite generates gets this prefix baked in.
  base: '/zef4/',
});
