import * as util from './util'
import { Matrix} from './Matrix'
import { Pair } from './Pair'
import { Die, DieComp } from './Die'

function distinct<T>(x: Array<T>): Array<T> {
  return Array.from(new Set(x))
}

export class Board {
  dice: Die[]
  dictionary: string[]
  minLetters: number
  dim: number
  numDice: number
  letters: Matrix<string>

  /**
   * Returns a shortened dictionary by excluding words that 
   *     1. have fewer than `  minLetters` letters, and
   *     2. have letters not appearing on the board.
   * Doing this step usually reduces the time required to solve the board.
   */
  shortenDict(letters: Matrix<string>, dictionary: string[], minLetters: number) {
    // Get number of letters.
    const numLetters = letters.vec().length

    // Shorten the dictionary based on min anx max number of letters. 
    const shortDict = dictionary.filter(w => 
      minLetters <= w.length && w.length <= numLetters
    )

    // Get unique letters in board.
    const letterSet = new Set(letters.vec())

    // This will be the final list of dictionary words to search.
    const finalShortDict: string[] = []

    // Keep only dictionary words for which the letters are all contained in
    // the board.
    shortDict.forEach(word => {
      let keep = true
      for (const w of distinct(word.split(''))) {
        // Don't keep the word if board does not have a letter in the
        // dictionary word.
        if (!letterSet.has(w)) {
          keep = false
          break
        }
      }
      keep && finalShortDict.push(word)
    })

    return finalShortDict
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

    // Get dimensions of board.
    this.dim = Math.sqrt(this.numDice)
    if (!util.isSquare(this.dim)) {
      throw new Error(`number of dice is ${this.numDice} but must be a square number!`)
    }

    // Shake the board.
    this.shake()
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
    const shortDict = this.shortenDict(this.letters, this.dictionary, this.minLetters)
    let allSolutions = Matrix.tabulate(this.dim, this.dim, (r, c) => {
      // console.log(`\r (${r}, ${c}) / (${this.dim}, ${this.dim})`)
      return this._solve(shortDict, [new Pair(r, c)])
    }).map(_ => _.flat())
    let out = Array.from(new Set(allSolutions.vec().flat()))
    return out.sort().sort((a, b) => a.length - b.length) // sort by first letter then length.
  }
}
