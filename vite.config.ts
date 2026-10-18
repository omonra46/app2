import path from "path"
import react from "@vitejs/plugin-react"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import { defineConfig } from "vite"

/**
 * Целевые браузеры сборки: актуальные Chrome/Edge/Firefox/Safari.
 * ES2021 покрывает optional chaining и логические присваивания без полифиллов,
 * Safari 15 — нижняя планка без транспиляции (Vite по умолчанию строит на 2020+).
 */
const buildTarget = "es2021"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    /**
     * Конверсия фото в AVIF/WebP на выходе сборки: браузер получает
     * современный формат, оригинальный JPEG в public/ остаётся фолбэком.
     * sharp используется только на этапе сборки (dev-зависимость).
     */
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 72, mozjpeg: true },
      webp: { quality: 72 },
      avif: { quality: 50 },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: buildTarget,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        /**
         * Разделение бандла:
         * - vendor-react: react/react-dom/router — каркас, меняется редко;
         * - vendor-ui: иконки и каркасы UI — дерево импортов lucide
         *   попадает в отдельный чанк и не тянет за собой код приложения.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react') || id.includes('scheduler')) {
            return 'vendor-react';
          }
          /* three.js — тяжёлый WebGL-рендерер, грузим отдельным чанком */
          if (id.includes('three')) {
            return 'vendor-three';
          }
          return 'vendor-ui';
        },
      },
    },
  },
});