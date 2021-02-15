import React, {useState} from 'react'
import * as util from './util'

// TODO: Refactor -- move states out into `App`. On boardShuffle, hide seed.
export function Seeder() {
  let [seedDisplay, setSeedDisplay] = useState("none")
  let [seed, setSeed] = useState("")
  let [msg, setMsg] = useState("Enter seed")

  function toggleSeedDisplay() {
    if (seedDisplay == "none") {
      setSeedDisplay("inline")
      setMsg("Enter seed")
    } else {
      setSeedDisplay("none")
      if (seed > "") {
        util.reseed(seed) // submit seed
        setMsg("Using seed: " + seed)
      }
    }
  }

  function setGlobalSeed(e) {
    setSeed(e.target.value)
  }

  let toggleCss = {
    borderRadius: "5px",
    background: "CornflowerBlue",
    color: "white",
    padding: "3px",
    marginRight: "10px"
  }

  let inputCss = {
    display: seedDisplay,
    borderRadius: "5px",
    border: "1px solid CornflowerBlue"
  }

  return (
    <form>
      <label onClick={toggleSeedDisplay} style={toggleCss}> {msg} </label>
      <input type="text" id="rngSeed" name="rngSeed"
             onChange={setGlobalSeed}
             style={inputCss} />
    </form>
  )
}
