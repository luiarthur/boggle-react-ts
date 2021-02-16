import * as util from './util'
import { Matrix} from './Matrix'
import { Pair } from './Pair'
import { Die, DieComp } from './Die'

export class Board {
  dice: Die[]
  dictionary: string[]
  minLetters: number
  dim: number
  numDice: number
  letters: Matrix<string>
  shortDict: string[]

  constructor(dice: Die[], dictionary: string[], minLetters: number=3) {
    this.dice = dice
    this.dictionary = dictionary
    this.minLetters = minLetters
    this.numDice = dice.length
    this.dim = Math.sqrt(this.numDice)
    this.shake()
    if (!util.isSquare(this.dim)) {
      throw new Error(`number of dice is ${this.numDice} but must be a square number!`)
    }
    this.shortDict = this.dictionary.filter(w => w.length >= this.minLetters)
  }

  shake() {
    this.letters = Matrix.fromArray(this.dim, this.dim,
      util.shuffle(this.dice.map(_ => _.roll())))
  }

  // Connects letters from visited `path`.
  chain(path: Pair[]): string {
    return path.map(pair => this.letters.get(pair.x, pair.y)).join("")
  }

  visited(path: Pair[], pos: Pair): boolean {
    // return path.includes(pos)
    let _visited = false
    for (const pair of path) {
      if (pair.equals(pos)) {
        _visited = true
        break
      }
    }
    return _visited
  }

  onBoard(pos: Pair): boolean {
    return 0 <= pos.x && pos.x < this.dim && 0 <= pos.y && pos.y < this.dim
  }

  propose(path: Pair[], move: Pair): Pair {
    return util.last(path).plus(move)
  }

  isValidMove(path: Pair[], move: Pair): boolean {
    let proposal = this.propose(path, move)
    return (!this.visited(path, proposal)) && this.onBoard(proposal)
  }

  private _solve(dict: string[], path: Pair[], solution: string[]=[]): string[] {
    if (dict.length == 0) { return solution } else {
      // All possible moves.
      let possibleMoves = Pair.possibleMoves.filter(move => this.isValidMove(path, move))

      // Create each possible chain of letters given current path.
      let sols = possibleMoves.map(move => {
        let newPath = path.concat(this.propose(path, move))
        let head = this.chain(newPath).toUpperCase()
        let newDict = dict.filter(word => word.startsWith(head))
        let newSolution = newDict.includes(head) ? solution.concat(head) : solution
        return this._solve(newDict, newPath, newSolution)
      })
      return Array.from(new Set(sols.flat()))
    }
  }

  solve(): string[] {
    let allSolutions = Matrix.tabulate(this.dim, this.dim, (r, c) => {
      // console.log(`\r (${r}, ${c}) / (${this.dim}, ${this.dim})`)
      return this._solve(this.shortDict, [new Pair(r, c)])
    }).map(_ => _.flat())
    let out = Array.from(new Set(allSolutions.vec().flat()))
    return out.sort().sort((a, b) => a.length - b.length) // sort by first letter then length.
  }
}
