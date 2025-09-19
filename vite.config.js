import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/joancolomer/' : '/',
  server: {
    fs: {
      // allow following paths (resolve symlinked edits folder)
      allow: [
        process.cwd(),
        '/Users/david/Desktop/web/joan/site/src/media',
      ],
    },
  },
})
