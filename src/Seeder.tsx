/// <reference path="util.ts" />
import React from 'react';

export class Seeder extends React.Component (props: {seed: number}) {
  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange} />
    )
  }
}
