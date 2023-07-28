import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://github.com/igorjba/front-integral-m05-t10",
  plugins: [react()],
})


