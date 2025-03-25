import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', '@mui/material'],
          'components': [
            './src/components/formPopUp.tsx',
            './src/components/projectsDetailPopUp.tsx',
            './src/components/certificatesDetailPopUp.tsx'
          ],
          'pages': ['./src/pages/admin.tsx', './src/pages/dashboard.tsx']
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
})
