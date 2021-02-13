import React from 'react';
import * as util from './util'

type DieProps = { faces: string[] }
export class Die extends React.Component<DieProps, {value: string}> {
  numFaces: number
  faces: string[]

  constructor(props: DieProps) {
    super(props)
    this.faces = props.faces
    this.numFaces = this.faces.length
    this.state = {value: this._roll(this.faces)}
  }

  roll() {
    this.setState(() => {
      value: this._roll(this.faces)
    })
  }

  private _roll(faces: string[]): string {
    const idx = util.randint(0, faces.length- 1)
    return faces[idx]
  }

  render() {
    return (
      <button> {this.state.value} </button>
    )
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
