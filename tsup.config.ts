import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['!scripts/**'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  minify: true,
  dts: true,
  clean: true
})
