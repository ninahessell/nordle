import logo from './logo.svg';
import './App.css';
import React from 'react';
var _ = require('lodash');


const keyboardLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterBoard: new Array(6).fill(null).map(() => new Array(5).fill(' ')),
      currentRow: 0,
      currentLetter: 0
    }
  }

  renderKey(val) {
    return (
      <button value={val}
        onClick={() => this.clickKey(val)}
        key={val}>
          {val}
      </button>
    )
  }

  clickKey(val) {
    let newLetterBoard = this.state.letterBoard;
    newLetterBoard[this.state.currentRow][this.state.currentLetter] = val;
    let [row, letter] = [this.state.currentRow, this.state.currentLetter]
    if (letter == 4) {
      row++;
      letter = 0;
    } else {
      letter++;
    }
    this.setState({
      letterBoard: newLetterBoard,
      currentRow: row,
      currentLetter: letter
    })
  }

  renderKeysRow(row) {
    let output = [];
    for (let j = 0; j < keyboardLetters[row].length; j++) {
      output.push(`${keyboardLetters[row][j]}`);
    }
    return (
      <div key={row}
        >
        {output.map(item => this.renderKey(item))}
      </div>
    )
  }

  renderWordRow(rowNum) {
    return (
      <div className="nordleRow"  key={rowNum}>
        {_.times(5, (i) => ( <div key={i} className="nordleLetter">{this.state.letterBoard[rowNum][i]} </div> ) )}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Nordle</h2>
        </header>
        {_.times(6, (i) => this.renderWordRow(i))}
        <br />
        {_.times(3, (i) => this.renderKeysRow(i))}
      </div>
    );
  }
}

export default App;
