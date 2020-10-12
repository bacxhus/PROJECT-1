// * Shoe Closet
const grid = document.querySelector('.grid')
const width = 9
let player = 76
const cells = []
let lazer = 76
let invaders = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16]
let hasFired = false
let director = 'right'
let getLow = false
let gotLow = false 

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
          cells[lazer].classList.remove('aliens')
          invaders.splice(invaders.indexOf(lazer), 1)
          cells[lazer].classList.remove('lazer')
          hasFired = false
          clearInterval(intervalTwo)
        }
      }
  
    }, 250)

  }


}

function move(amount) {
  invaders.forEach((alien) => {
    cells[alien].classList.remove('aliens')
  })

  invaders = invaders.map((item) => {
    return item = item + amount
  })

  invaders.forEach((alien) => {
    cells[alien].classList.add('aliens')
  })

} 


// * Magic That Moves Aliens
invaders.forEach((alien) => {
  cells[alien].classList.add('aliens')
})

const interval = setInterval(() => {


  invaders.forEach((alien) => {
    if (alien % 9 === 0 && gotLow === false) {
      director = 'right'
      getLow = true
    } else if ((alien + 1) % 9 === 0 && gotLow === false) {
      director = 'left' 
      getLow = true
    }
  })

  if (getLow === true ) {
    move(9)
    getLow = false
    gotLow = true
  } else {
    gotLow = false
    if (director === 'left') {
      move(-1)
    } else if (director === 'right') {
      move(1)
    }
  }

  

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