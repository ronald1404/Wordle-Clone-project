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

function addColorTokey(keyLetter, color){
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
}const box = document.getElementById('box');

const flipTile = () =>{
  const rowTiles =  document.querySelector('#row_' + currentRow).childNodes;
  rowTiles.forEach((tile, index) =>{
    const dataLetter = tile.getAttribute('data')
    setTimeout(() => {
      tile.classList.add('flip')
      if(dataLetter == wordle[index]){
        tile.classList.add('green-overlay');
        addColorTokey(dataLetter, 'green-overlay');
      }else if(wordle.includes(dataLetter)){
        tile.classList.add('yellow-overlay');
      }else{
        tile.classList.add('grey-overlay');
      }
    }, 500 * index);
  })
}