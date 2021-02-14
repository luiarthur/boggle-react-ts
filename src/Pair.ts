export class Pair {
  x: number
  y: number
  static moves = [
    new Pair(0, 1),
    new Pair(1, 0),
    new Pair(1, 1),
    new Pair(-1, -1),
    new Pair(0, -1),
    new Pair(-1, 0),
    new Pair(-1, 1),
    new Pair(1, -1)
  ]

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  plus(that: Pair): Pair {
    return new Pair(this.x + that.x, this.y + that.y)
  }

  minus(that: Pair): Pair {
    return new Pair(this.x - that.x, this.y - that.y)
  }

  isNeighbor(that: Pair, dist: number = 1) {
    let diff = this.minus(that)
    return Math.abs(diff.x) <= 1 && Math.abs(diff.y) <= 1
  }

  equals(that: Pair) {
    return (this.x == that.x) && (this.y == that.y)
  }
 }
