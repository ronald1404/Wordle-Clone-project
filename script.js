const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');
const wordle = 'SUPER';
let isGameOver;
const keys = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<-',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER',
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

let currentRow = 0, currentTile = 0;

guessRows.forEach((row, idx) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', 'row_' + idx);

  row.forEach((guess, guessIdx) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', 'row_' + idx + '-guess_' + guessIdx)
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  })

  tileDisplay.append(rowElement);
})

keys.forEach(key => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', "kbd_" + key)
  buttonElement.addEventListener('click', () => handleClick(key))
  keyboard.append(buttonElement);
})

const handleClick = (key) => {
  console.log('clicked ' + key);
  if (key == "<-") {
    deleteLetter()
    return
  } else if (key == "ENTER") {
    checkRow()
    return
  }
  addLetter(key);
}

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById("row_" + currentRow + "-guess_" + currentTile);
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data', letter);
    currentTile++;
  }
}

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById('row_' + currentRow + "-guess_" + currentTile);
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '')
  }
}

const checkRow = () => {
  const guess = guessRows[currentRow].join('');
  if (currentTile == 5) {
    console.log('guess is ' + guess, 'wordle is ' + wordle);
    flipTile();
    if (wordle == guess) {
      showMessage('Great!');
      isGameOver = true;
    }else{
      if (currentRow >= 5){
        isGameOver = false;
        showMessage('Game Over');
        return;
      }
      if(currentRow < 5){
        currentRow++;
        currentTile = 0;
      }
    }
  }
}

const showMessage = (message) => {
  const messageElement = document.createElement('p')
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById("kbd_" + keyLetter)
  key.classList.add(color)
}

//parado em 1:01:17 do video em https://www.youtube.com/watch?v=mpby4HiElek
const flipTile = () =>{
  const rowTiles =  document.querySelector('#row_' + currentRow).childNodes;
  let checkWordle = wordle;
  const guess = [];

  rowTiles.forEach(tile =>{
    guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
  })

  guess.forEach((guess, index) => {
    if (guess.letter== wordle[index]){
      guess.color = 'green-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  guess.forEach(guess =>{
    if(checkWordle.includes(guess.letter)){
      guess.color = 'yellow-overlay';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  })
  rowTiles.forEach((tile, index) =>{
    setTimeout(()=>{
      tile.classList.add('flip')
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color)

    }, 500 * index)
  })
  /*
  rowTiles.forEach((tile, index) =>{
    const dataLetter = tile.getAttribute('data')
    setTimeout(() => {
      tile.classList.add('flip')
      if(dataLetter == wordle[index]){
        tile.classList.add('green-overlay');
        addColorToKey(dataLetter, 'green-overlay');
      }else if(wordle.includes(dataLetter)){
        tile.classList.add('yellow-overlay');
        addColorToKey(dataLetter, 'yellow-overlay');
      }else{
        tile.classList.add('grey-overlay');
        addColorToKey(dataLetter, 'grey-overlay');
      }
    }, 500 * index);
  })*/
}