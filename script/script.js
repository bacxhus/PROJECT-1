// * Shoe Closet
const grid = document.querySelector('.grid')
const width = 9
let player = 76
const cells = []
let invaders = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16]

// * Griddy McGrid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
}

// * THE OG 
cells[player].classList.add('player')


// * Do-Hickey That Moves Aliens
invaders.forEach((alien) => {
  cells[alien].classList.add('aliens')
})

setInterval(() => {

  const newInvaders = invaders.map((item) => {
    return item += 9
  })

  invaders.forEach((alien) => {
    cells[alien].classList.remove('aliens')
  })

  invaders = newInvaders

  invaders.forEach((alien) => {
    cells[alien].classList.add('aliens')
  })

}, 3000)


// * Sorcery That Moves The Ship
document.addEventListener('keypress', (event) => {
  const key = event.key
  if (key === 'w' && !(player < width)) {
    return // THIS IS FOR LAZER FUNCTION 
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

