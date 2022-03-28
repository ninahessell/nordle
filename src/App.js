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

const todaysWord = 'sight';

class LetterSquare extends React.Component {
  render() {
    return (
      <div className={"nordleLetter" + (this.props.color ? ` ${this.props.color}-color` : '') } >
        {this.props.val}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterBoard: new Array(6).fill(null).map(() => new Array(5).fill('')),
      colorOfBoard: new Array(6).fill(null).map(() => new Array(5).fill('')),
      currentRow: 0,
      currentLetter: 0
    }
  }

  renderKey(val) {
    return (
      <button value={val}
        onClick={() => this.selectKey(val)}
        key={val}
        className="keyboardLetter">
          {val}
      </button>
    )
  }

  selectKey(val) {
    if (val == 'Del') {
      return this.handleDelete();
    }

    if (val == 'Enter') {
      return this.checkWord(this.state.currentRow);
    };
    let newLetterBoard = this.state.letterBoard;
    let [color, row, letter] = [this.state.colorOfBoard, this.state.currentRow, this.state.currentLetter]

    if (letter < 5) {
      newLetterBoard[row][letter] = val;
      letter++;
      this.setState({
        letterBoard: newLetterBoard,
        colorOfBoard: color,
        currentRow: row,
        currentLetter: letter
      })
    }
  }

  handleDelete() {
    let {letterBoard, colorOfBoard, currentRow, currentLetter} = this.state;
    if (currentLetter == 0) {
      return
    }
    currentLetter--;
    letterBoard[currentRow][currentLetter] = '';
    this.setState({letterBoard, colorOfBoard, currentRow, currentLetter})
  }

  checkWord(row) {
    if (this.state.currentLetter !== 5) return;
    let word = '';
    this.state.letterBoard[row].map((i) => word += i);
    console.log(word)
    if (words.indexOf(word) > -1) {
      // it's a word! add some gray, yellow, and green
      // to do: check an actual api/full word list if it's a real word
      this.letterCheck(word);
    } else {
      // it's not a word... clear the row or do nothing!
      console.error('not a word');
    }
    let {letterBoard, colorOfBoard, currentRow, currentLetter} = this.state;
    currentLetter = 0;
    currentRow++;
    this.setState({letterBoard, colorOfBoard, currentRow, currentLetter});
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

  letterCheck(word) {
    let row = this.state.letterBoard[this.state.currentRow];
    let {letterBoard, colorOfBoard, currentRow, currentLetter} = this.state;
    let rowColors = [];
    row.map((letter, i) => {
      if (letter === todaysWord.charAt(i)) {
        console.log(letter);
        rowColors.push('green');
      } else if (todaysWord.indexOf(letter) !== -1) {
        rowColors.push('yellow');
      } else {
        rowColors.push('gray');
      }
    })
    colorOfBoard[currentRow] = rowColors;
    this.setState({letterBoard, colorOfBoard, currentRow, currentLetter});
  }

  renderWordRow(rowNum) {
    return (
      <div className="nordleRow"  key={rowNum}>
        {_.times(5, (i) => (
          <LetterSquare key={i} val={this.state.letterBoard[rowNum][i]} color={this.state.colorOfBoard[rowNum][i]}/>
        ))}
      </div>
    )
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    if (event.key === 'Enter'){
     return this.checkWord(this.state.currentRow);
    }
    if (event.key === "Backspace") {
      return this.handleDelete();
    }
    if ((event.key).match('[a-zA-Z]')) {
      this.selectKey(event.key);
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyDown}>
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
