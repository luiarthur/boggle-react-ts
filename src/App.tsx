import React, {useState} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Die, dice16, DieComp } from './Die'
import { scrabbleDict } from './scrabble-dict'
import { Pair } from './Pair'
import * as util from './util'
import $ from 'jquery'

/** Would love for this to work. But does not...
async function readTextFile(path: string) {
  let response = await fetch(path)
  let data = await response.text()
  return data.split(",")
}
const dictpath = "/assets/scrabble_dict.txt"
const mydict = readTextFile(dictpath)
*/

function App() {
  const dict = scrabbleDict
  console.log(dict.length)
  let x = [1,2,3,4,5]
  let p = new Pair(3,5)
  let dice = dice16.map(faces => new Die(faces))
  let [diceVal, setDiceVal] = useState(dice.map(_ => _.roll()))
  let dieComps = diceVal.map(val => <DieComp value={val}/>)
  // let [seed, setSeed] = useState(Math.random().toString())

  // util.GLOBAL_RNG.reseed(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>WIP</h1>
      </header>

      <li>random number: {util.randint(0, 10)}</li>
      <li>variance: {util.variance(x)}</li>
      <li>Pair: ({[p.x, p.y].join(',')})</li>

      <button onClick={() => setDiceVal(dice.map(_ => _.roll()))}>Shuffle</button>
      <br/><br/>
      {dieComps}
      <h1>{dict[12351]}</h1>

    </div>
  );
}

// function Seeder(props: {value: string}) {
//   return (
//     <form onSubmit={() => util.GLOBAL_RNG.reseed(props.value)}>
//       <label>Enter a seed:</label>
//       <input type="text" id="rngSeed" name="rngSeed"/>
//       <input type="submit" value="Submit"/>
//     </form>
//   )
// }

export default App;
