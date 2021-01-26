import {
  Q,
  on,
  set,
  who,
  NORD_PALETTE,
  create,
  setStyle,
  append,
  randomize,
  toggleClass
} from "./Utils.js"

const config = {
  BOARD_SIZE: 8,
  DRAGGED_RUNE: -1,
  DRAGGED_COLOR: '',
  DROPPED_RUNE: -1,
  DROPPED_COLOR: ''
}

const FIRE = NORD_PALETTE[11]
const WATER = NORD_PALETTE[10]
const EARTH = NORD_PALETTE[14]
const AIR = NORD_PALETTE[5]
const LIGHT = NORD_PALETTE[13]
const DARK = NORD_PALETTE[15]

const COLORS = [FIRE, WATER, EARTH, AIR, LIGHT, DARK]

const BOARD = []

const END_BOARD = config.BOARD_SIZE ** 2

for (let i = 0; i < END_BOARD; i++) {
  const cell = create('cell')
  const rune = create('rune')

  setStyle(rune, { 'background-color': COLORS[randomize(COLORS.length)] })
  set(rune, {draggable: true, id: i})

  on('click', (event) => {
    toggleClass(event.target, 'pulse')
  }, rune)

  append(cell, [rune])
  BOARD.push(cell)
}

const layout = Q('.layout')

const dragStart = (ev) => {
  console.log(ev.target.id, 'dragStart')
}

const dragEnd = (ev) => {
  console.log(ev.target.id, 'dragEnd')
}

const dragOver = (ev) => {
  console.log(ev.target.id, 'dragOver')
}

const dragEnter = (ev) => {
  console.log(ev.target.id, 'dragEnter')
}

const dragLeave = (ev) => {
  console.log(ev.target.id, 'dragLeave')
}

const dragDrop = (ev) => {
  console.log(ev.target.id, 'dragDrop')
}

BOARD.forEach(board_rune => {
  const rune = who(board_rune).children[0]

  on('dragstart', dragStart, rune)
  on('dragend', dragEnd, rune)
  on('dragover', dragOver, rune)
  on('dragenter', dragEnter, rune)
  on('dragleave', dragLeave, rune)
  on('drop', dragDrop, rune)

  append(layout, [board_rune])
})
