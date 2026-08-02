import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Appen serveras från https://stephan-svesin.github.io/habits/
  base: '/habits/',
  plugins: [react()],
})
