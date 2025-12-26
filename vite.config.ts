/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react(),tailwindcss()],
})

// Because vite config can't recognize test property so merge it with vitest config
export default mergeConfig(
   viteConfig,
   defineVitestConfig({
     test: {
        // Enables global APIs like 'describe', 'expect', 'it' 
        // so you don't have to import them in every file
        globals: true,
        // Tells vitest to use the fake browser environment
        environment: 'jsdom',
        // Path to the setup file
        setupFiles: './src/test/setup.ts',
     }
   })
)