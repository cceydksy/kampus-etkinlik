import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2221032047 sayısını yuvarlayıp renk tonunu bozuyor; kapalı kalsın
    cssMinify: false,
  },
})
