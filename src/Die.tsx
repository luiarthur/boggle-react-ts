import React from 'react';
import * as util from './util'
import './App.css'

type DieProps = { faces: string[] }

export function DieComp(props: {value: string}) {
  let value = props.value
  if (value.length == 1) {
    // value = "\u00A0" + value
  }
  return (
    <button className="die"> {value} </button>
  )
}

export class Die {
  numFaces: number
  faces: string[]

  constructor(faces: string[]) {
    this.faces = faces
    this.numFaces = faces.length
  }

  roll() {
    const idx = util.randint(1, this.numFaces)
    return this.faces[idx - 1]
  }
}

export const dice16 = [
  "A,A,E,E,G,N",
  "A,B,B,J,O,O",
  "A,C,H,O,P,S",
  "A,F,F,K,P,S",
  "A,O,O,T,T,W",
  "C,I,M,O,T,U",
  "D,E,I,L,R,X",
  "D,E,L,R,V,Y",
  "D,I,S,T,T,Y",
  "E,E,G,H,N,W",
  "E,E,I,N,S,U",
  "E,H,R,T,V,W",
  "E,I,O,S,S,T",
  "E,L,R,T,T,Y",
  "H,I,M,N,U,Qu",
  "H,L,N,N,R,Z"].map(_ => _.split(','))
