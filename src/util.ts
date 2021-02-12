import seedrandom from 'seedrandom'

export type RNG = () => number

export const GLOBAL_RNG = seedrandom()

export function randint(a: number, b: number, rng: RNG = GLOBAL_RNG) {
  return Math.floor(rng() * (b - a + 1)) + a
}

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

export function shuffle<T>(arr: Array<T>, rng: RNG = GLOBAL_RNG) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
  }
  return arr
}

export function isSquare(x: number) {
  let sqrtx = Math.sqrt(x)
  return Math.floor(sqrtx) == sqrtx
}
