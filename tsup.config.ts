import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['!src/**/*.stories.*', '!src/stories/**'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
})
