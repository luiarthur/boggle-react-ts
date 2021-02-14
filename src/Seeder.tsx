import React, {useState} from 'react'
import * as util from './util'

export function Seeder() {
  let [seedDisplay, setSeedDisplay] = useState("none")
  let [seed, setSeed] = useState("")

  function toggleSeedDisplay() {
    if (seedDisplay == "none") {
      setSeedDisplay("inline")
    } else {
      setSeedDisplay("none")
    }
  }

  function setGlobalSeed(e) {
    setSeed(e.target.value)
    seed > "" && util.reseed(seed)
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
      <label onClick={toggleSeedDisplay} style={css}> Enter seed </label>
      <input type="text" id="rngSeed" name="rngSeed"
             onChange={setGlobalSeed}
             style={{display: seedDisplay, borderRadius: "10px"}} />
    </form>
  )
}
