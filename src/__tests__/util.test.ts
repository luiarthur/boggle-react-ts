import seedrandom from 'seedrandom'
import * as util from '../util'

// See helpers below.

test('util', () => {
  util.GLOBAL_RNG.reseed("0")
  let v = Array(100000).fill(0).map(_ => util.randint(1, 6))
  const vmean = mean(v)
  const vmean10 = mean(v.slice(0, 10))

  // Test mean and std are correct for dice role.
  let numDigits = 2
  expect(mean(v)).toBeCloseTo(3.5, numDigits)
  expect(std(v)).toBeCloseTo(1.7078, numDigits)

  // Test shuffle
  util.shuffle(v)
  expect(mean(v)).toEqual(vmean)
  expect(mean(v.slice(0, 10))).not.toEqual(vmean10)
})


/** Helper functions. */
function sum(x: number[]) {
  let s = 0
  x.forEach(xi => s += xi)
  return s
}

function mean(x: number[]) {
  return sum(x) / x.length
}


function sqsum(x: number[]) {
  let ss = 0
  x.forEach(xi => ss += xi * xi)
  return ss
}

function variance(x: number[]) {
  let ss = sqsum(x)
  return ss / x.length - mean(x) ** 2
}

function std(x: number[]) {
  return Math.sqrt(variance(x))
}
