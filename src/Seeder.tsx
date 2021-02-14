import React, {useState} from 'react'
import * as util from './util'

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
      seed > "" && util.reseed(seed) // submit seed
      setMsg("Using seed: " + seed)
    }
  }

  function setGlobalSeed(e) {
    setSeed(e.target.value)
  }

  let css = {
    borderRadius: "10px",
    background: "CornflowerBlue",
    color: "white",
    padding: "3px",
    marginRight: "10px"
  }

  return (
    <form>
      <label onClick={toggleSeedDisplay} style={css}> {msg} </label>
      <input type="text" id="rngSeed" name="rngSeed"
             onChange={setGlobalSeed}
             style={{display: seedDisplay, borderRadius: "10px"}} />
    </form>
  )
}
