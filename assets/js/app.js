// * Dom Elements
const grid = document.querySelector('.grid')
const cells = []

// * grid variables
const width = 20
const height = 10
const cellCount = width * height

// * game variables
let snakePosition = 1
let localStorageSteps = [snakePosition]
let currentIndex = 1
let tailSize = []
let tailAppear = []
let snakeLength = 1
let wasTailAdded = false


// * game elements 
let foodIndex = Math.floor(Math.random() * cellCount)
let musicIndex = Math.floor(Math.random() * cellCount)
let dangerIndex = Math.floor(Math.random() * cellCount)
let angelIndex = Math.floor(Math.random() * cellCount)
let speedIndex = Math.floor(Math.random() * cellCount)
let bonusIndex = Math.floor(Math.random() * cellCount)
let supriseStageIndex = 0



// * difficulty change
let movementInterval = 400
let addSpeed = 2
let slowSpeed = .5
let dangerInterval = 10000
let angelInterval = 100000
let bonusInterval = 50000
const speedChoices = [1, 2, 3, 4]

// * music random choices (note drop it in a seperate folder)
let currentMusic = new Audio()
let music1 = new Audio('https://cdn.discordapp.com/attachments/791636167304151071/959092485798371389/miyagisama-sage-of-the-six-paths-cinematic-club-scene-chase-escape-9458.mp3')
let music2 = 0
let music3 = 0
let music4 = 0
const musicChoices = [music1, music2, music3, music4]

// * random background choices (note drop it in a seperate folder)
let bgm1= 0
let bgm2 = 0
let bgm3 = 0
let bgm4 = 0
const bgmChoices = [bgm1, bgm2, bgm3, bgm4]




// * For the snake to continue to move non stop with a set interval 
function moveGameLoop() {setInterval(() => {
  let direction = 'ArrowLeft'
  if (currentIndex === 1) {
    direction  = 'ArrowRight'
  }
  else if (currentIndex === width) {
    direction = 'ArrowDown'
  }
  else if (currentIndex === -width) {
    direction = 'ArrowUp'
  }
  snakeMove()
  // * if snakePosition hits corners 
  const rowPosition = snakePosition % width
  const colPosition = Math.floor(snakePosition / height)
  if (rowPosition === 0 && direction === 'ArrowLeft') {
    endGame()
  }
  else if(rowPosition === width -1 && direction === 'ArrowRight') {  
    endGame()
  }
  else if(colPosition === 0 && direction === 'ArrowUp'){
    endGame()
  }
  else if(colPosition === height -1 && direction === 'ArrowDown'){
    endGame()
  }

  // * if snakePosition hits food categories and expands
  if (cells[snakePosition].classList.contains('food')) {
    cells[snakePosition].classList.remove('food')
    console.log('food eaten')
    spawnFood()
    addTail() 
  }
  else if(cells[snakePosition].classList.contains('bonus')) {
    cells[snakePosition].classList.remove('bonus')
    spawnBonus()
    addTail() 
  }

  else if(cells[snakePosition].classList.contains('angel')) {
    cells[snakePosition].classList.remove('angel')
    spawnAngel()
    angelPower()
    addTail() 
  }

  else if(cells[snakePosition].classList.contains('speed')) {
    cells[snakePosition].classList.remove('speed')
    spawnSpeed()
    chooseSpeed()
    addTail() 
  }

  else if(cells[snakePosition].classList.contains('music')) {
    cells[snakePosition].classList.remove('music')
    spawnMusic()
    // chooseMusic()
    addTail() 
  }

  // * if food hits border, snake, danger or stage = need to be added 
  else if (cells[snakePosition].classList.contains('tail', 'danger', 'border',)) {
    console.log('end game')
  }

  // * needs to be placed here otherwise it keeps resetting
  localStorageSteps.push(snakePosition)
  renderSnake()
  },movementInterval)
}

// * to create the snake(sheep)
function addSnake() {
  cells[snakePosition].classList.add('snake')
}

// * creates the endgame function
function endGame() {
   console.log('end game')
}

// * adds everytime one tail when eaten food
function addTail() {
    snakeLength += 1
    console.log('tail was added')
  } 

// * snake on the move to appear
function snakeMove() {
  // cells[snakePosition].classList.remove('snake')
  snakePosition += currentIndex
  // cells[snakePosition].classList.add('snake')
  console.log('snake is moving')
}

// * to create the grid to start the game
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell) 
  }
  addSnake()
}

function renderSnake() {
  console.log(snakeLength)
  for (i = 0; i < snakeLength; i++) {
    let index = localStorageSteps[localStorageSteps.length - 1 - i]
    console.log(index)
    cells[index].classList.add('snake')
  }
  cells[localStorageSteps[localStorageSteps.length - snakeLength - 1]].classList.remove('snake')
}
// * this is for the movement of the snake input
document.addEventListener('keyup', (event) => {

  const key = event.code

  if (key === 'ArrowLeft') {
    currentIndex = -1
  } else if (key === 'ArrowRight') { 
    currentIndex = +1
  } else if (key === 'ArrowUp') { 
    currentIndex = -width
  } else if (key === 'ArrowDown') { 
    currentIndex = +width
  }
})

// * for the danger, angel and bonus to spawn in certain intervals 
function spawnDanger() {
  setInterval(() => {
    let dangerIndex = Math.floor(Math.random() * cells.length) 
    cells[dangerIndex].classList.add('danger')
  }, dangerInterval)
}

function spawnAngel() {
  setInterval(() => {
    while (true) {
    let angelIndex = Math.floor(Math.random() * cells.length)
      if (!cells[angelIndex].classList.contains('snake', 'danger', 'speed', 'food', 'music', 'bonus')) { 
    cells[angelIndex].classList.add('angel')
    break
      }
    }
  }, angelInterval)
}

function angelPower() {
  let dangerIndex
  cells[dangerIndex].classList.remove('danger')
}

function spawnBonus() {
  setInterval(() => {
    while (true) {
    let bonusIndex = Math.floor(Math.random() * cells.length)
      if (!cells[bonusIndex].classList.contains('snake', 'danger', 'speed', 'food', 'music', 'angel')) { 
    cells[bonusIndex].classList.add('bonus')
    break
      }
    }
  }, bonusInterval)
}


// * for food to spawn after eaten and food with bonus effect
function spawnFood() {
  while (true) {
    let foodIndex = Math.floor(Math.random() * cells.length) 
    if (!cells[foodIndex].classList.contains('snake', 'danger', 'angel')) {
      cells[foodIndex].classList.add('food')
      break
    }
  }
}

function spawnSpeed() {
  while (true) {
    if (!cells[speedIndex].classList.contains('snake', 'danger', 'angel')) {
      let speedIndex = Math.floor(Math.random() * cells.length) 
      cells[speedIndex].classList.add('speed')
      break
    }
  }
}

function chooseSpeed() {
  let randomSpeed = Math.floor(Math.random() * speedChoices.length);
  let movementInterval = movementInterval * randomSpeed;
}

function spawnMusic() {
  while (true) {
    let musicIndex = Math.floor(Math.random() * cells.length) 
    if (!cells[musicIndex].classList.contains('snake', 'danger', 'angel', 'food', 'speed')) {
      cells[musicIndex].classList.add('music')
      break
    }
  }
}

function chooseMusic() {
  const randomMusic = Math.floor(Math.random() * musicChoices.length);
  // currentMusic.pause();
  // currentMusic += musicChoices[randomMusic];
  // currentMusic.play();
}

createGrid()
moveGameLoop()


// * group of spawn food types
spawnFood()
spawnSpeed()
spawnMusic()

// * Nick and Max 
spawnAngel()
spawnBonus()
spawnDanger()