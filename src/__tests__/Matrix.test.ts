import {Matrix} from '../Matrix'
import seedrandom from 'seedrandom'
import * as util from '../util'

test('Matrix', () => {
  // Test all equal 0.
  let m = new Matrix(3, 2, 0);
  for (let r = 0; r < m.nrow; r++) {
    for (let c = 0; c < m.ncol; c++) {
      expect(m.get(r, c)).toEqual(0)
    }
  }

  // Flatten array should have correct length.
  expect(m.vec().length).toEqual(6)

  // Test all equal zero except (0, 2)
  m.set(0, 2, 99)
  m.forEach((r, c) => {
    switch([r, c]) {
      case [0, 2]:
        expect(m.get(r, c)).toEqual(99)
      default:
        expect(m.get(r, c)).toEqual(0)
    }
  })

  // Create a matrix from array.
  let m2 = Matrix.fromArray(3, 2, [1,2,3,4,5,6])
  expect(m2.get(0, 0)).toEqual(1)
  expect(m2.get(0, 1)).toEqual(2)
  expect(m2.get(1, 0)).toEqual(3)
  expect(m2.get(1, 1)).toEqual(4)
  expect(m2.get(2, 0)).toEqual(5)
  expect(m2.get(2, 1)).toEqual(6)

  // Test shuffling.
  util.GLOBAL_RNG.reseed(0)
  let m2old = Matrix.fromArray(3, 2, m2.vec())
  let m3 = m2.shuffled()
  expect(m3.get(0, 0)).not.toEqual(m2.get(0, 0))

  // shuffled should not mutate.
  m2old.forEach((r, c) => {
    expect(m2old.get(r, c)).toEqual(m2.get(r, c))
  })

  // shuffle should mutate
  m2.shuffle()
  expect(m2old.get(0, 0)).not.toEqual(m2.get(0, 0))
});
