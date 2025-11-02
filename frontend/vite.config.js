import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        signup: resolve(__dirname, 'signup.html'),
        admin: resolve(__dirname, 'admin.html'),
        forgot_password: resolve(__dirname, 'forgot_password.html'),
        owner: resolve(__dirname, 'owner.html'),
        properties: resolve(__dirname, 'properties.html'),
        property_detail: resolve(__dirname, 'property-detail.html'),
        saved: resolve(__dirname, 'saved.html'),
        homepage: resolve(__dirname, 'homepage.html'),
   
      },
    },
  },
  server:{
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  }
})
