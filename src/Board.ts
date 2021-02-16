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

  /**
   * Returns a shortened dictionary by excluding words that 
   *     1. have fewer than `  minLetters` letters, and
   *     2. have letters not appearing on the board.
   * Note that this slows down initialization of the board, but solving is
   * substantially faster. The alternative is searching on a much larger initial 
   * dictionary, which slows down solving. In most cases, people will shuffle and
   * then pause to play the game, and then click solve. In this case, shuffling speed
   * will be irrelavent and solving will be seeminglyinstantaneous.
   */
  shortenDict(letters: Matrix<string>, dictionary: string[], minLetters: number) {
    let shortDict = this.dictionary.filter(w => w.length >= this.minLetters)
    let letterSet = new Set(this.letters.vec())
    return shortDict.filter(w => util.setdiff(new Set(w.split('')), letterSet).length == 0)
  }

  shake() {
    this.letters = Matrix.fromArray(this.dim, this.dim,
      util.shuffle(this.dice.map(_ => _.roll())))
    console.log("Board was shaken.")
  }

  constructor(dice: Die[], dictionary: string[], minLetters: number=3) {
    this.dice = dice
    this.dictionary = dictionary
    this.minLetters = minLetters
    this.numDice = dice.length
    this.dim = Math.sqrt(this.numDice)
    this.shake()
    this.shortDict = this.shortenDict(this.letters, this.dictionary, this.minLetters)
    if (!util.isSquare(this.dim)) {
      throw new Error(`number of dice is ${this.numDice} but must be a square number!`)
    }
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
