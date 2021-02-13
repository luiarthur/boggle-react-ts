import * as util from './util'

// Row Major
export class Matrix<T> {
  nrow: number
  ncol: number
  rows: T[][]

  static fromArray<T>(nrow: number,  ncol: number, arr: T[]) {
    let m = new this(nrow, ncol, arr[0])
    m.forEach((r, c) => m.set(r, c, arr[r * ncol + c]))
    return m
  }

  constructor(nrow: number,  ncol: number, elem: T) {
    this.nrow = nrow
    this.ncol = ncol
    this.rows = Array.from(Array(nrow), () => new Array(ncol).fill(elem));
  }

  forEach(f: (r:number, c:number) => void) {
    for (let r = 0; r < this.nrow; r++) {
      for (let c = 0; c < this.ncol; c++) {
        f(r, c)
      }
    }
  }

  set(r: number, c: number, value: T) {
    (this.rows[r])[c] = value
  }

  get(r: number, c: number) {
    return this.rows[r][c]
  }

  indices() {
    let out:number[][] = [];
    for (let r=0; r < this.nrow; r++) {
      for (let c=0; c < this.ncol; c++) {
        out.push([r, c])
      }
    }
    return out
  }

  vec(): T[] {
    return this.rows.flat();
  }

  shuffled() {
    let v = util.shuffle(this.vec())
    return Matrix.fromArray(this.nrow, this.ncol, v)
  }

  shuffle() {
    let s = this.shuffled()
    this.forEach((r, c) => {
      this.set(r, c, s.get(r, c))
    })
  }
}
