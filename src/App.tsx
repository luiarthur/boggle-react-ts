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
  console.log(dict.length)
  const dice = dice16.map(faces => new Die(faces))

  const board = new Board(dice, dict, 3)
  console.log(board.letters.rows.flat())

  const shuffleStyle = {
    borderRadius: "25px",
    border: "none",
    background: "darkgrey"
  }

  let [letters, setLetters] = useState(board.letters)

  function shakeBoard(e) {
    board.shuffle()
    setLetters(board.letters)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>WIP</h1>
      </header>

      <br/> <button onClick={shakeBoard} style={shuffleStyle}> Shuffle </button> <br/> 
      <br/> <Seeder/> <br/>

      {/* <br/> {dieComps} <br/> */}
      <BoardComp board={board} />
      <br/> <SolveButton board={board} /> <br/>


      {console.log("sanity check: " + dict[util.randint(0, dict.length - 1)])}
    </div>
  );
}

export default App;
