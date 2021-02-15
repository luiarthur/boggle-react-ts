import * as util from './util'

// Row Major
export class Matrix<T> {
  nrow: number
  ncol: number
  rows: T[][]

  static fromArray<T>(nrow: number,  ncol: number, arr: T[]) {
    return Matrix.tabulate(nrow, ncol, (r, c) => arr[r * ncol + c])
  }

  static tabulate<T>(nrow: number,  ncol: number, f: (r:number, c:number) => T): Matrix<T> {
    let m = Matrix.fill(nrow, ncol, f(0, 0))
    for (let r = 0; r < nrow; r++) {
      for (let c = 0; c < ncol; c++) {
        m.set(r, c, f(r, c))
      }
    }
    return m
  }

  static fill<T>(nrow: number,  ncol: number, elem: T) {
    let rows = Array.from(Array(nrow), () => new Array(ncol).fill(elem));
    return new this(rows)
  }

  constructor(rows: T[][]) {
    this.rows = rows
    this.nrow = rows.length
    this.ncol = rows[0].length
    rows.forEach(row => {
      if (row.length != this.ncol) {
       throw new Error("Number of elements is not the same in each row!")
      }
    })
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

  map(f: Function): Matrix<T> {
    return Matrix.tabulate(this.nrow, this.nrow, (r, c) => f(this.get(r, c)))
  }
}
