import './App.css';
import React from 'react';
import { words} from './words.js';
var _ = require('lodash');

const keyboardLetters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Del', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
];

let todaysWord = 'sight';
todaysWord = words[Math.floor(Math.random()*words.length)];

class LetterSquare extends React.Component {
  render() {
    return (
      <div className={"nordleLetter" + (this.props.color ? ` ${this.props.color}-color` : '') }>
        {this.props.val}
      </div>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <div className={this.props.className}>{this.props.message}</div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className={this.props.className}>
        <h2>Nordle</h2>
      </header>
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
      currentLetter: 0,
      message: '',
      todaysWord: todaysWord
    }
    this.invalidWordAlert = this.invalidWordAlert.bind(this);
  }

  invalidWordAlert() {
    this.setState({message: 'Hmm, looks like that\'s not in our word list'});
    setInterval(() => {
      this.setState({message: ''})
    }, 500)
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
    if (val === 'Del') {
      return this.handleDelete();
    }
    if (val === 'Enter') {
      return this.checkWord(this.state.currentRow);
    }
    let [newLetterBoard, row, letter] = [this.state.letterBoard, this.state.currentRow, this.state.currentLetter]
    if (letter < 5) {
      newLetterBoard[row][letter] = val;
      letter++;
      this.setState({
        letterBoard: newLetterBoard,
        currentLetter: letter
      })
    }
  }

  handleDelete() {
    let {letterBoard, colorOfBoard, currentRow, currentLetter} = this.state;
    if (currentLetter === 0) {
      return
    }
    currentLetter--;
    letterBoard[currentRow][currentLetter] = '';
    this.setState({letterBoard, currentLetter})
  }

  checkWord(row) {
    if (this.state.currentLetter !== 5) return;
    let word = '';
    this.state.letterBoard[row].map((i) => word += i);
    console.log(word)
    if (words.indexOf(word) > -1) {
      this.letterCheck(word);
    } else {
      return this.invalidWordAlert();
    }
    let currentRow = this.state.currentRow;
    currentRow++;
    this.setState({currentRow, currentLetter: 0});
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
    let colorOfBoard = this.state.colorOfBoard;
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
    colorOfBoard[this.state.currentRow] = rowColors;
    this.setState({colorOfBoard});
    if (rowColors.every((val) => val === 'green')) {
      this.setState({message: 'You Win!'});
    }
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
    if ((event.key).match('[a-zA-Z]') && event.key.length === 1) {
      this.selectKey(event.key);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    // get random word
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {

    const messageDisplay = this.state.message.length > 0 ? '-display' : '';

    return (
      <div className="App">
        <Header className="App-header"/>
        {_.times(6, (i) => this.renderWordRow(i))}
        <br />
        {_.times(3, (i) => this.renderKeysRow(i))}
        <Message className={`message${messageDisplay}`} message={this.state.message}/>
      </div>
    );
  }
}

export default App;

/* 

TO DO:
- Add 'not a word' animation
- Sharing functionality (messages)

VARIATIONS:
- make live comparing possible, rooms?
- four letter words

*/
