import React, { useState } from 'react'
import { Matrix } from './Matrix'
import { Board } from './Board'
import { DieComp } from './Die'

export function BoardComp(props: {board: Board}) {
  let dim = props.board.dim
  return (
    <table style={{marginLeft:"auto", marginRight:"auto"}}>
      <tbody>
        {
          props.board.letters.rows.map((row, r) => (
            <tr key={r}>
              {row.map((value, c) => (<th key={c}><DieComp value={value}/></th>))}
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export function SolveButton(props: {board: Board}) {
  let [solution, setSolution] = useState("")
  let board = props.board

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
