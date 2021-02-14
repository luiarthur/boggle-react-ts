import React, {useState} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Die, dice16, DieComp } from './Die'
// import { scrabbleDict } from './scrabble-dict'
import { Pair } from './Pair'
import * as util from './util'
import {zipWithIndex} from './util'
import $ from 'jquery'
import {Seeder} from './Seeder'
import * as scrabbleDict from './scrabble-dict.json'

const dict = scrabbleDict.scrabbleDict
console.log(dict.length)
const dice = dice16.map(faces => new Die(faces))

const shuffleStyle = {
  borderRadius: "25px",
  border: "none",
  background: "darkgrey"
}

function App() {
  let [diceVal, setDiceVal] = useState(dice.map(_ => _.roll()))
  let dieComps = zipWithIndex(diceVal).map(z => <DieComp value={z[0]} key={z[1]} />)

  function shuffleDice() {
    setDiceVal(dice.map(_ => _.roll()))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>WIP</h1>
      </header>

      <br/>
      {dieComps}
      <br/>

      <br/>
      <button onClick={shuffleDice} style={shuffleStyle}> Shuffle </button>
      <br/>

      <br/> <Seeder/> <br/>

      <h3> {dict[util.randint(0, dict.length - 1)]} </h3>
    </div>
  );
}

export default App;
