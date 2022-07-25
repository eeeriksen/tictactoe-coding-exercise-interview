let x = 0
let o = 0
let currentPlayer = 'x'
const optionsToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]
let winner = ''
let turns = 0
let xFound = 0
let oFound = 0

const fullResetButton = document.querySelector('.full-reset')
const newGame = document.querySelector('.new-game')
const game = document.querySelector('.game')
const playerO = document.querySelector('.two')
const playerX = document.querySelector('.one')
const winnerMessage = document.querySelector('.winner')
const boxes = document.querySelectorAll('.box')

boxes.forEach(box => {
  box.addEventListener('click', (box) => boxClicked(box))
})

fullResetButton.addEventListener('click', () => fullReset())
newGame.addEventListener('click', () => showBoard())

const fullReset = () => {
  resetGame()
  x = 0
  o = 0
  playerX.innerText = x
  playerO.innerText = o
}

const showBoard = () => {
  if (game.style.display != 'block') {
    fullResetButton.style.display = 'block'
    game.style.display = 'block'
    newGame.style.display = 'none'
  }
}

const boxClicked = (e) => {
  let box = e.target
  if (box.classList.length === 1) {
    box.innerHTML = `<div class="a">${currentPlayer}</div>`
    box.classList.add(currentPlayer)
    currentPlayer === 'x' ? currentPlayer = 'o' : currentPlayer = 'x'
    turns++
    if (turns > 4) winnerDetect()
  }
}

const resetGame = () => {
  boxes.forEach(box => {
    box.className = 'box'
    const children = document.querySelectorAll('.a')
    children.forEach(child => child.parentNode.removeChild(child))
  })
  turns = 0
  winner = ''
  turns = 0
  xFound = 0
  oFound = 0
  setTimeout(() => {
    winnerMessage.innerText = ''
  }, 3000)
}

const winnerDetect = () => {
  optionsToWin.forEach(option => {
    option.forEach((position, index) => {
      boxes[position].classList[1] === 'x' ?
        xFound++ :
        boxes[position].classList[1] === 'o' ?
          oFound++ : null
    })
    if (xFound === 3) {
      winner = 'x'
    } else if (oFound === 3) {
      winner = 'o'
    }
    xFound = 0
    oFound = 0
    if (winner !== '') {
      if (winner === 'x') {
        x++
        playerX.innerText = x
      } else {
        o++
        playerO.innerText = o
      }
      winnerMessage.innerText = `The winner is ${winner.toUpperCase()}`
      resetGame()
    } else if (turns === 9 && winner === '') {
      winnerMessage.innerText = `There is no winner, play again!`
      resetGame()
    }
  })
}
