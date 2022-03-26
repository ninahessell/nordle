import logo from './logo.svg';
import './App.css';
import React from 'react';
var _ = require('lodash');

class Keys extends React.Component {
  render() {
    return (
      <span>
        {this.props.value}
      </span>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [
        ['q', 'w', 'e', 'r', 't', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      ]
    }
  }

  renderKey(val) {
    return (
      <Keys value={val}
        onClick={this.clickKey}/>
    )
  }

  clickKey() {
    console.log('clicked');
  }

  renderKeysRow(row) {
    let output = [];
    for (let j = 0; j < this.state.letters[row].length; j++) {
      output.push(`[${this.state.letters[row][j]}]`);
    }
    return (
      <div>
        {output.map(item => this.renderKey(item))}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Nordle</h2>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {_.times(3, (i) => this.renderKeysRow(i))}
      </div>
    );
  }
}

export default App;
