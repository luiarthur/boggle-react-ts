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

  const [seedViz, setSeedViz] = useState(false)
  // NOTE: Doing `useState(new Board(dice, dict, minLetters))` led to
  // unintended behavior.
  const [board, setBoard] = useState(() => new Board(dice, dict, minLetters))
  const [solution, setSolution] = useState("")
  const [numWords, setNumWords] = useState(0)
  const [isSolved, setIsSolved] = useState(false)

  const shuffleStyle = {
    borderRadius: "5px",
    border: "none",
    color: "white", 
    background: "CornFlowerBlue",
    margin: "20px"
  }

  let [letters, setLetters] = useState(board.letters)
  let [showSolution, setShowSolution] = useState(false)

  function shakeBoard() {
    // NOTE: Should this also be `() => new Board(dice, dict, minLetters)`?
    setBoard(new Board(dice, dict, minLetters))
    setLetters(board.letters)
    setIsSolved(false)
    setShowSolution(false)
    setSolution("")
    setSeedViz(false)
  }

  function generateSolution() {
    if (!isSolved) {
      const solutionArray = board.solve()
      setNumWords(solutionArray.length)
      console.log("Number of words in solution: " + solutionArray.length)
      setSolution(solutionArray.join(", "))
      setIsSolved(true)
      setShowSolution(true)
    } else {
      setShowSolution(!showSolution)
    }
  }

  function showSeeder() {
    setSeedViz(true)
  }

  return (
    <div className="App">
      <Seeder seedViz={seedViz} showSeeder={showSeeder} />

      <button onClick={shakeBoard} style={shuffleStyle}> Shuffle </button>

      {/* <br/> {dieComps} <br/> */}
      <BoardComp board={board} />
      <br/> 
        <SolveButton generateSolution={generateSolution} solution={solution} 
          isSolved={isSolved} showSolution={showSolution} /> 
        <br/>
    </div>
  );
}

export default App;
