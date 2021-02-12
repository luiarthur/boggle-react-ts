import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import { Seeder } from './Seeder'
import { Pair } from './Pair'
import * as util from './util'

function App() {
  let x = [1,2,3,4,5]
  let p = new Pair(3,5)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>
        <li>random number: {util.randint(0, 1)}</li>
        <li>variance: {util.variance(x)}</li>
        <li>Pair: ({[p.x, p.y].join(',')})</li>
    </div>
  );
}

export default App;
