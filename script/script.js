// * Shoe Closet
const grid = document.querySelector('.grid')
const width = 9
let player = 76
const cells = []
let lazer = 76
let invaders = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16]
let hasFired = false
let direction = 'right'
let goDown = false
let goneDown = false 



// * Griddy McGrid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}



// * THE OG 
cells[player].classList.add('player')



// * Major Lazor
function lazerFire() {

  if (hasFired === false ) {
    lazer = player
    // ? Setting has fired to true, it is only made false again at the end of the
    // ? lazer statement, meaning you can't run the function again while one lazer
    // ? already exists
    hasFired = true 


    const intervalTwo = setInterval(() => {

      if (lazer - 9 < 0 ) {
        cells[lazer].classList.remove('lazer')
        hasFired = false
        clearInterval(intervalTwo)
      } else {
        cells[lazer].classList.remove('lazer')
        lazer -= 9
        cells[lazer].classList.add('lazer')

        if (invaders.indexOf(lazer) !== -1) {
          // ? Removing the alien class
          cells[lazer].classList.remove('aliens')
          // ? Remove the invader from the array
          invaders.splice(invaders.indexOf(lazer), 1)
          cells[lazer].classList.remove('lazer')
          hasFired = false
          clearInterval(intervalTwo)
        }
      }
    }, 250)
  }

}



// * Magic That Moves Aliens

// ? Adding alien class to the invaders array at the start of the game.
invaders.forEach((alien) => {
  cells[alien].classList.add('aliens')
})

function move(amount) {

  // ? Removing alien class at the stat of the iteration.
  invaders.forEach((alien) => {
    cells[alien].classList.remove('aliens')
  })

  // ? Mapping the alien class based on the argument.
  invaders = invaders.map((alien) => {
    return alien = alien + amount
  })

  // ? Adding the alien class at the end of the iteration. 
  invaders.forEach((alien) => {
    cells[alien].classList.add('aliens')
  })

} 

// ? Interval for aliens moving
const interval = setInterval(() => {

  // ? Testing if the aliens are on the right or the left
  // ? If they are goDown is set to true. 
  invaders.forEach((alien) => {
    if (alien % 9 === 0 && goneDown === false) {
      direction = 'right'
      goDown = true
    } else if ((alien + 1) % 9 === 0 && goneDown === false) {
      direction = 'left' 
      goDown = true
    }
  })


  if (goDown === true ) {
    // ? Because goDown is true the aliens move one down.
    // ? goDown is put back to false and goneDown is set to true. 
    move(9)
    goDown = false
    // ? WTF have I done? Where the fuck does goneDown change back to false?!
    goneDown = true
  } else {
    // ? Ready to test for side-hits in If Statement above
    goneDown = false


    // ? Arguments for move()
    if (direction === 'left') {
      move(-1)
    } else if (direction === 'right') {
      move(1)
    }
  }

  // ? To stop the invaders
  if (invaders.includes(79)) {
    clearInterval(interval)
  }


}, 2000)



// * Sorcery That Moves The Ship
document.addEventListener('keypress', (event) => {
  const key = event.key
  if (key === 'w' && !(player < width)) {
    return lazerFire()
  } else if (key === 'a' && !(player % width === 0)) {
    cells[player].classList.remove('player')
    player -= 1
    cells[player].classList.add('player')
  } else if (key === 'd' && !(player % width === width - 1)) {
    cells[player].classList.remove('player')
    player += 1
    cells[player].classList.add('player')
  }

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