import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Unocss from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import presetWind from '@unocss/preset-wind'
import presetRemToVw from 'unocss-preset-rem-to-vw'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    Unocss({
      presets: [
        presetAttributify({ /* options */ }),
        presetWind(),
        presetRemToVw()
      ],
      transformers: [
        transformerAttributifyJsx(), // <--
      ],
    }),
  ],
})
