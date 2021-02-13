import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import { Seeder } from './Seeder'
import { Die, dice16 } from './Die'
import { Pair } from './Pair'
import * as misc from './misc'
import * as util from './util'


function App() {
  let x = [1,2,3,4,5]
  let p = new Pair(3,5)
  let dice = dice16.map(die => <Die faces={die} />)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>
        <li>random number: {util.randint(0, 1)}</li>
        <li>variance: {util.variance(x)}</li>
        <li>Pair: ({[p.x, p.y].join(',')})</li>
        {dice}
        <br/> <br/> <br/>
        <misc.ShuffleButton dice={dice.map(_ => _.props)} />
    </div>
  );
}

export default App;
