import React, {useState} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import { Seeder } from './Seeder'
import { Die, dice16, DieComp } from './Die'
import { Pair } from './Pair'
import * as util from './util'

function App() {
  let x = [1,2,3,4,5]
  let p = new Pair(3,5)
  let [dice, setDice] = useState(dice16.map(faces => new Die(faces)))
  let dieComps = dice.map(die => <DieComp value={die.value}/>)
  // util.GLOBAL_RNG.reseed(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>
        <li>random number: {util.randint(0, 10)}</li>
        <li>variance: {util.variance(x)}</li>
        <li>Pair: ({[p.x, p.y].join(',')})</li>

        {dieComps}

        <br/><br/>
        <button onClick={() => setDice(dice.map(_ => _.roll()))}>Shuffle</button>
    </div>
  );
}

export default App;
