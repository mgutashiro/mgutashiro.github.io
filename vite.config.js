import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',             // ✅ user site root
  publicDir: false,      // ✅ no public folder

  plugins: [
    react(),
    {
      name: 'load+transform-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null
        return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
      },
    },
  ],

  build: {
    outDir: 'docs',      // ✅ deploy /docs via Pages
    emptyOutDir: true,
    sourcemap: true,
  },
})