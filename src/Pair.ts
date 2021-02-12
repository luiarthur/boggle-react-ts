export class Pair {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  plus(that: Pair): Pair {
    return new Pair(this.x + that.x, this.y + that.y)
  }

  equals(that: Pair) {
    return (this.x == that.x) && (this.y == that.y)
  }
 }
