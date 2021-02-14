import './util'
import { Die, DieComp } from './Die'

export class Board {
  dice: Die[]
  dictionary: string[]
  minLetters: number

  constructor(dice: Die[], dictionary: string[], minLetters: number=3) {
    this.dice = dice
    this.dictionary = dictionary
    this.minLetters = minLetters
  }

  // TODO
}
