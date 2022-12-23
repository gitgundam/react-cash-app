import type { Preset } from 'unocss'

const remRE = /(-?[\.\d]+)rem/g
const pxRE = /(-?[\.\d]+)px/g

export interface PxToVwOptions {
  baseFontSize?: number
  baseWidth?: number
  unitPrecision?: number
}

export default function remToVwPreset(options: PxToVwOptions = {}): Preset {
  const { baseFontSize = 16, baseWidth = 375, unitPrecision = 4 } = options

  const pxToVw = (px: number) => ((100 / baseWidth) * px).toFixed(unitPrecision)

  return {
    name: 'preset-rem-to-vw',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string')
          if (remRE.test(value))
            i[1] = value.replace(
              remRE,
              (_, p1) => `${pxToVw(p1 * baseFontSize)}vw`
            )
          else if (pxRE.test(value))
            i[1] = value.replace(pxRE, (_, p1) => `${pxToVw(p1)}vw`)
      })
    },
  }
}
