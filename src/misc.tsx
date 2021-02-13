import React from 'react'
import {Die} from './Die'

export class ShuffleButton extends React.Component<{dice: Die[]}> {
  constructor(props: {dice: Die[]}) {
    super(props)
  }

  shuffle_dice() {
    this.props.dice.forEach(die => die.roll())
  }

  render() {
    return (
      <button onClick={this.shuffle_dice}> Shuffle </button>
    )
  }
}
