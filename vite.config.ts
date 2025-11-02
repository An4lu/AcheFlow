import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gantt-task-react')) {
              return 'vendor-gantt';
            }
            if (id.includes('react-big-calendar')) {
              return 'vendor-calendar';
            }
            if (id.includes('react-google-charts')) {
              return 'vendor-google-charts';
            }
            if (id.includes('xlsx')) {
              return 'vendor-xlsx';
            }
            return 'vendor'; 
          }
        },
      },
    },
  },
})
