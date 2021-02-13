import seedrandom from 'seedrandom'
import * as util from '../util'

test('util', () => {
  util.GLOBAL_RNG.reseed(0)
  let v = Array(100000).fill(0).map(_ => util.randint(1, 6))
  const vmean = util.mean(v)
  const vmean10 = util.mean(v.slice(0, 10))

  // Test mean and std are correct for dice role.
  let numDigits = 2
  expect(util.mean(v)).toBeCloseTo(3.5, numDigits)
  expect(util.std(v)).toBeCloseTo(1.7078, numDigits)

  // Test shuffle
  util.shuffle(v)
  expect(util.mean(v)).toEqual(vmean)
  expect(util.mean(v.slice(0, 10))).not.toEqual(vmean10)
})
