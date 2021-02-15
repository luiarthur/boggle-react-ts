import React, {useState} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Die, dice16, DieComp } from './Die'
// import { scrabbleDict } from './scrabble-dict'
import { Pair } from './Pair'
import { Board } from './Board'
import { BoardComp, SolveButton } from './BoardComp'
import * as util from './util'
import $ from 'jquery'
import {Seeder} from './Seeder'
import * as scrabbleDict from './scrabble-dict.json'

function App() {
  const dict = scrabbleDict.scrabbleDict
  const dice = dice16.map(faces => new Die(faces))
  const minLetters = 3

  const [board, setBoard] = useState(new Board(dice, dict, minLetters))
  const [solution, setSolution] = useState("")
  const [numWords, setNumWords] = useState(0)
  const [isSolved, setIsSolved] = useState(false)

  const shuffleStyle = {
    borderRadius: "5px",
    border: "none",
    background: "pink"
  }

  let [letters, setLetters] = useState(board.letters)
  let [solViz, setSolViz] = useState(false)

  function shakeBoard() {
    setBoard(new Board(dice, dict, minLetters))
    setLetters(board.letters)
    setIsSolved(false)
    setSolViz(false)
    setSolution("")
  }

  function generateSolution() {
    if (!isSolved) {
      const solutionArray = board.solve()
      setNumWords(solutionArray.length)
      setSolution(solutionArray.join(", "))
      setIsSolved(true)
      setSolViz(true)
    } else {
      setSolViz(!solViz)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>

      <br/>
      <Seeder/>
      <br/>
      <button onClick={shakeBoard} style={shuffleStyle}> Shuffle </button>
      <br/>
      <br/>

      {/* <br/> {dieComps} <br/> */}
      <BoardComp board={board} />
      <br/> 
        <SolveButton generateSolution={generateSolution} solution={solution} 
          isSolved={isSolved} solViz={solViz} /> 
        <br/>
    </div>
  );
}

export default App;
