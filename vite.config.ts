import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        embed: './src/embed.ts',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: chunkInfo => {
          if (chunkInfo.name === 'style.css') return 'main.css'
          return '[name].[ext]'
        },
        chunkFileNames: '[name].[hash].js',
      },
    },
  },
})
