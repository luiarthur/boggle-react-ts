import * as util from './util'

export class Die {
  numFaces: number
  faces: string[]

  constructor(faces: string[]) {
    this.faces = faces
    this.numFaces = faces.length
  }

  roll(rng: util.RNG=util.GLOBAL_RNG): string {
    const idx = util.randint(0, this.numFaces - 1, rng)
    return this.faces[idx]
  }
}
