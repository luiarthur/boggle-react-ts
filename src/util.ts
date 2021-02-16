import seedrandom from 'seedrandom'

export type RNG = () => number

export class AppRNG {
  rng: RNG

  constructor() {
    this.rng = seedrandom()
  }

  reseed(seed: string) {
    this.rng = seedrandom(seed)
  }
}

export const GLOBAL_RNG = new AppRNG()
export function reseed(seed: string) { GLOBAL_RNG.reseed(seed) }

export function randint(a: number, b: number) {
  return Math.floor(GLOBAL_RNG.rng() * (b - a + 1)) + a
}

export function setdiff(a, b) {
  return [...a].filter(x => !b.has(x));
}

export function shuffle<T>(arr: Array<T>): Array<T> {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(GLOBAL_RNG.rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

export function isSquare(x: number) {
  let sqrtx = Math.sqrt(x)
  return Math.floor(sqrtx) == sqrtx
}

export function last<T>(arr: Array<T>): T {
  return arr[arr.length - 1]
}
