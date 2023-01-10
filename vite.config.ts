import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Unocss from 'unocss/vite'
import { toEscapedSelector } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import presetWind from '@unocss/preset-wind'
import presetRemToVw from 'unocss-preset-rem-to-vw'
import UnocssIcons from '@unocss/preset-icons'

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
      rules: [],
      presets: [
        presetAttributify({ /* options */ }),
        presetWind(),
        presetRemToVw(),
        UnocssIcons({
          // options
          prefix: 'i-',
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          }
        })
      ],
      transformers: [
        transformerAttributifyJsx(), // <--
      ],
    }),
  ],
  server: {
    host: true
  }
})
