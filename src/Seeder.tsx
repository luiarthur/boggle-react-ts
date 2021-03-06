import React, {useState} from 'react'
import * as util from './util'

// TODO: Refactor -- Eventually, we want to pass an rng into board.
export function Seeder(props: {seedViz: boolean, showSeeder: () => void}) {

  function reseed(e) {
    const value = e.target.value
    console.log("Reseeding")
    if (value == "") {
      util.reseed(Math.random().toString())
    } else {
      util.reseed(value)
    }
  }

  function makeHeader() {
    if (props.seedViz) {
      return (<input type="text" onChange={reseed} autoFocus />)
    } else {
      return (<h1> Boggle </h1>)
    }
  }

  return (
    <header className="App-header" onClick={props.showSeeder} >
      { makeHeader() }
    </header>
  )
}
