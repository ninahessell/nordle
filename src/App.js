import logo from './logo.svg';
import './App.css';
import { words } from './words.js';
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
      letterBoard: new Array(6).fill(null).map(() => new Array(5).fill('')),
      currentRow: 0,
      currentLetter: 0
    }
  }

  renderKey(val) {
    return (
      <button value={val}
        onClick={() => this.clickKey(val)}
        key={val}
        className="keyboardLetter">
          {val}
      </button>
    )
  }

  clickKey(val) {
    if (val == 'Del') {
      return this.handleDelete();
    }

    if (val == 'Enter') {
      return this.checkWord(this.state.currentRow);
    };
    let newLetterBoard = this.state.letterBoard;
    let [row, letter] = [this.state.currentRow, this.state.currentLetter]
    newLetterBoard[row][letter] = val;

    if (letter < 5) {
      letter++;
      this.setState({
        letterBoard: newLetterBoard,
        currentRow: row,
        currentLetter: letter
      })
    }
  }

  handleDelete() {
    let {letterBoard, currentRow, currentLetter} = this.state;
    if (currentLetter == 0) {
      return
    }
    currentLetter--;
    letterBoard[currentRow][currentLetter] = '';
    this.setState({letterBoard, currentRow, currentLetter})
  }

  checkWord(row) {
    if (this.state.currentLetter !== 5) return;
    let word = '';
    this.state.letterBoard[row].map((i) => word += i);
    console.log(word)
    if (words.indexOf(word) > -1) {
      // it's a word! add some gray, yellow, and green
      // to do: check an actual api/full word list if it's a real word
      console.log('its a word!')
      let letterBoard = this.state.letterBoard;
    } else {
      // it's not a word... clear the row or do nothing!
      console.error('not a word');
    }
    let {letterBoard, currentRow, currentLetter} = this.state;
    currentLetter = 0;
    currentRow++;
    this.setState({letterBoard, currentRow, currentLetter});
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

  handleKeyPress = (event) => {
    event.preventDefault();
    if (event.key === 'Enter'){
     return this.checkWord(this.state.currentRow);
    }
    if (event.key === "Backspace") {
      return this.handleDelete();
    }
    if ((event.key).match('[a-zA-Z]')) {
      this.clickKey(event.key);
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyPress}>
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
