/** Helper functions. */
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
