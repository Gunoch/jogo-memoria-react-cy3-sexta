import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base must match the repository name when deploying to GitHub Pages
  base: '/jogo-memoria-react-cy3-sexta/',
})
