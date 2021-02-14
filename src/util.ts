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

export function zipWithIndex<T>(arr: Array<T>) {
  let result = []
  for (let i = 0, _aLength = arr.length; i < _aLength; i++) {
    let element = arr[i]
    result.push([element, i])
  }
  return result
}

/** Code below is mostly for tests. */

export function sum(x: number[]) {
  let s = 0
  x.forEach(xi => s += xi)
  return s
}

export function mean(x: number[]) {
  return sum(x) / x.length
}


export function sqsum(x: number[]) {
  let ss = 0
  x.forEach(xi => ss += xi * xi)
  return ss
}

export function variance(x: number[]) {
  let ss = sqsum(x)
  return ss / x.length - mean(x) ** 2
}

export function std(x: number[]) {
  return Math.sqrt(variance(x))
}
