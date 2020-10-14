// * SHOE CLOSET
const startButton = document.querySelector('a')
const grid = document.querySelector('.grid')
const width = 9
const cells = []
let ship = 76
let lazer = 0
let invaders = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16]
// LAZER
let hasFired = false
// BOMB
let bomb = 0
let hasDropped = false
// ALIEN DIRECTION
let direction = 'right'
let goDown = false
let goneDown = false
// RESULT
let youLost = false
let youWon = false
// DISPLAY: PLAYER LIVES
const livesDiplasy = document.querySelector('.lives')
let playerLives = 3
// DISPLAY: PLAYER POINTS
const pointsDisplay = document.querySelector('.points')
let points = 0
// LEADER BOARD
const resetButton = document.querySelector('.reset')
let playerScores = []
const scoresDisplay = document.querySelector('ol')
// POP WIN 
const popWin = document.querySelector('.pop-win')
const submit = document.querySelector('button.submit')



// * R U LOCAL? 
if (localStorage) {
  playerScores = JSON.parse(localStorage.getItem('scores')) || []
  orderAndDisplayScores()
}

function leaderBoard() {
  const newName = prompt('Enter your name for the leaderboard')
  const newScore = points
  const player = { name: newName, score: newScore }
  playerScores.push(player)

  if (localStorage) {
    localStorage.setItem('scores', JSON.stringify(playerScores))
  }

  orderAndDisplayScores()
}

function orderAndDisplayScores() {

  const array = playerScores

    .sort((playerA, playerB) => playerB.score - playerA.score)

    .map(player => {
      return `<li>${player.name} has ${player.score} apples.</li>`
    })

  scoresDisplay.innerHTML = array.join('')

}

resetButton.addEventListener('click', () => {
  localStorage.removeItem('scores')
})




// * Griddy McGrid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}




// * THE OG 
cells[ship].classList.add('player')

invaders.forEach((alien) => {
  cells[alien].classList.add('aliens')
})



startButton.addEventListener('click', () => {

  // * AVENGERS END GAME
  function result() {
    if (youWon) {
      clearInterval(intervalAlien)
      popWin.style.display = 'flex'
      // leaderBoard()
    } else if (youLost) {
      clearInterval(intervalAlien)
      alert('Game Over')
      leaderBoard()
    }
  }


  // * Major Lazor
  function lazerFire() {

    if (hasFired === false) {
      lazer = ship
      // BELOW STOPS FROM RUNNING MULTIPLE TIMES
      hasFired = true
      

      const intervalLazer = setInterval(() => {

        if (lazer - 9 < 0) {
          cells[lazer].classList.remove('lazer')
          hasFired = false
          clearInterval(intervalLazer)
        } else {
          cells[lazer].classList.remove('lazer')
          lazer -= 9
          cells[lazer].classList.add('lazer')
          // COLLISION STUFF
          if (invaders.indexOf(lazer) !== -1) {
            // REMOVE ALIEN CLASS AND INDEX
            cells[lazer].classList.remove('aliens')
            invaders.splice(invaders.indexOf(lazer), 1)
            // REMOVE LAZER CLASS
            cells[lazer].classList.remove('lazer')
            // RESET HAS FIRED & +POINTS
            hasFired = false
            points += 10
            clearInterval(intervalLazer)
          }

          // INNER TEXT POINTS
          pointsDisplay.innerText = `${points}`
        }

        // END GAME
        if (points >= 140) {
          youWon = true 
          result()
          clearInterval(intervalLazer)
        }

      }, 100)
    }
  }


  // * BOMBOCLAAT 
  if (hasDropped === false) {

    // RANDOM INVADERS ARRAY
    bomb = invaders[Math.floor(Math.random() * invaders.length)]
    // STOPS MULTIPLE BOMBS DROPPING
    hasDropped = true


    const intervalBomb = setInterval(() => {
      // MOVING BOMBS
      if (bomb + 9 > 80) {
        cells[bomb].classList.remove('bomb')
        hasDropped = false
        bomb = invaders[Math.floor(Math.random() * invaders.length)]
      } else {
        cells[bomb].classList.remove('bomb')
        bomb += 9
        cells[bomb].classList.add('bomb')
      }


      // REMOVING PLAYER LIFE
      if (bomb === ship) {
        cells[bomb].classList.remove('bomb')
        playerLives--
        hasDropped = false
      }


      // END GAME
      if (playerLives === 0) {
        youLost = true
        result()
        clearInterval(intervalBomb)
      } else if (youWon) {
        clearInterval(intervalBomb)
      } else if (youLost === true) {
        clearInterval(intervalBomb)
      }


      // INNTER TEXT PLAYER LIVES
      livesDiplasy.innerText = `${playerLives}`

    }, 500)
  }



  // * MAGIC THAT MOVES ALIENS
  function move(amount) {

    // - ALIEN CLASS @ START OF ITERAION
    invaders.forEach((alien) => {
      cells[alien].classList.remove('aliens')
    })

    // MAP ALIEN CLASS BASED ON ARGUMENT
    invaders = invaders.map((alien) => {
      return alien = alien + amount
    })

    // + ALIEN CLASS AT END OF ITERATION
    invaders.forEach((alien) => {
      cells[alien].classList.add('aliens')
    })

  }

  const intervalAlien = setInterval(() => {

    // R ALIENS ON RIGHT OR LEFT? GODOWN = TRUE
    invaders.forEach((alien) => {
      if (alien % 9 === 0 && goneDown === false) {
        direction = 'right'
        goDown = true
      } else if ((alien + 1) % 9 === 0 && goneDown === false) {
        direction = 'left'
        goDown = true
      }
    })


    if (goDown === true) {
      // ALIENS WILL MOVE 1 DOWN
      // GO DOWN WILL BE SET BACK TO FALSE
      move(9)
      goDown = false
      goneDown = true
    } else {
      // CONTINE MOVING TO SIDE
      goneDown = false
      // ARGUMENTS FOR MOVE
      if (direction === 'left') {
        move(-1)
      } else if (direction === 'right') {
        move(1)
      }
    }


    // END GAME
    if (invaders.includes(79)) {
      youLost = true
      result()
    }


  }, 2500)



  // * SHIP SORCERY
  document.addEventListener('keypress', (event) => {
    const key = event.key
    if (key === 'w' && !(ship < width)) {
      return lazerFire()
    } else if (key === 'a' && !(ship % width === 0)) {
      cells[ship].classList.remove('player')
      ship -= 1
      cells[ship].classList.add('player')
    } else if (key === 'd' && !(ship % width === width - 1)) {
      cells[ship].classList.remove('player')
      ship += 1
      cells[ship].classList.add('player')
    }
  })
})


submit.addEventListener('click', () => {
  console.log('happy')
})











// ! FAILED ATTEMPS AT THINGS. SCROLL NO FARTHER. 

// //* Trying to increase with MAP
// invaders.map((item) => {
//   const newInvaders = item += 1
//   console.log(newInvaders)
//   // ! brings 2 - 17 as numbers - how turn this into array?
//   return newInvaders
// })


// //* Trying to increase with For Loop
// for (let i = 0; i < invaders.length; i++) {
//   invaders[i] += 1
//   console.log(invaders)
//   // ! brings back like 14 arrays lol
// }


// * Trying to increase with For Each
// invaders.forEach((alien) => {
//   const newInvaders = alien += 1
//   return console.log(newInvaders)
//   // ! brings 2 - 17 as numbers - how turn this into array?
// })

// * Trying to get aliens to stop
// ? Put the whole thing in a for loop
// for (let j = 0; j < cells[80]; j++) {

// }

// ? Comparison VAR
// if (invaders === stop) {
//   console.log('hello')
// }

// ? Cells Include
// if (cells.includes('aliens', 64)) {
//   clearInterval(interval)
// }

// ? Cells/Invaders ClassList Contains
// if (invaders[64, 65, 66, 67, 68, 69, 70, 73, 74, 75, 76, 77, 78, 79].classList.contains('aliens')){
//   console.log('hello')
// }

// ? Width Boundary
// if (invaders > (width ** 2) - width - 1) {
//   clearInterval(interval)
// }

// ? Array Check
// if (invaders === invaders[64, 65, 66, 67, 68, 69, 70, 73, 74, 75, 76, 77, 78, 79]) {
//   clearInterval(interval)
// }

// ? Clear Interval
// cells.forEach((item) => {
//   item.addEventListener('click', () => {
//     clearInterval(interval)
//   })
// }

// ? OBJECT

// class Lazer {
//   constructor() {
//     this.location = player - 9
//   }

//   move() {
//     if (this.canMove()) {
//       this.location -= 9
//     }
//   }

//   hit() {
//     for (let i = 0; i < invaders.length; i++) {
//       if (this.location == invaders[i]) {
//         return true
//       }
//     }
//     return false
//   }

//   canMove() {
//     if (this.location - 9 < 0) {
//       return false
//     } else {
//       return true
//     }
//   }
// }


// ? THING

// const intervalTwo = setInterval(() => {

//   lazers = lazers.filter((lazer) => {
//     if (lazer.canMove()) {
//       return lazer
//     } else {
//       cells[lazer.location].classList.remove('lazer')
//     }
//   })

//   lazers.forEach((lazer) => {
//     cells[lazer.location].classList.remove('lazer')
//     lazer.move()
//     cells[lazer.location].classList.add('lazer')
//   })

//   for (let i = 0; i < lazers.length; i++) {
//     if (lazers[i].hit()) {
//       cells[lazers[i].location].classList.remove('lazer')
//       invaders[lazers[i].location].classList.remove('aliens')

//       invaders = invaders.splice(lazers[i].location, 1)

//       lazers = lazers.splice(i, 1)

//       // invaders = invaders.filter((alien) => {
//       //   if (alien !== lazers[i].location ) {
//       //     return alien
//       //   }         
//       // })

//       // lazers = lazers.filter((lazer) => {
//       //   if (lazer !== lazers[i]) {
//       //     return lazer
//       //   } 
//       // })
//     }
//   }
// }, 1000)