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

export function SolveButton(props: {generateSolution: () => void, solution: string, isSolved: boolean,
                            solViz: boolean}) {
  const css = {
    borderRadius: "5px",
    backgroundColor: "lightgreen",
    border: "none"
  }

  return (
    <div>
      <button style={css} onClick={props.generateSolution}> Show / Hide Solution </button>
      <br/><br/> 
      <p style={{display: props.solViz ? "inline" : "none"}}> {props.solution} </p>
    </div>
  )
}
