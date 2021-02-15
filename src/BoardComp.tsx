import React, { useState } from 'react'
import { Matrix } from './Matrix'
import { Board } from './Board'
import { DieComp } from './Die'

export function BoardComp(props: {diceVal: string[]}) {
  let dim = Math.sqrt(props.diceVal.length)
  let compMat = Matrix.fromArray(dim, dim, props.diceVal)
  return (
    <table style={{marginLeft:"auto", marginRight:"auto"}}>
      {
        compMat.rows.map(row => (
          <tr>
            {row.map(value => (<th><DieComp value={value}/></th>))}
          </tr>
        ))
      }
    </table>
  )
}

export function SolveButton(props: {diceVal: string[], dict: string[],
                            minLetters: number}) {
  let [solution, setSolution] = useState("")
  let board = new Board(props.diceVal, props.dict, props.minLetters)

  function solve() {
    setSolution(board.solve().join(", "))
  }

  const css = {
    borderRadius: "25px",
    backgroundColor: "pink",
    border: "none"
  }

  return (
    <div>
      <button style={css} onClick={solve}> Show / Hide Solution </button>
      <br/> <br/>
      <p> {solution} </p>
    </div>
  )
}
