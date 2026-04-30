import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

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
    svgr()
  ],

  build: {
    outDir: 'docs',      // ✅ deploy /docs via Pages
    emptyOutDir: true,
    sourcemap: true,
  },

})