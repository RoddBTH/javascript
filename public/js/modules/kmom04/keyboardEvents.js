/**
 * @module keyboardEvents
 */
import {
  handleDoubleClick
} from './mouseEvents.js'
/**
 * Hjälpmodalt fönster - Visa hjälp.
 */
export function showHelpModal () {
  const modal = document.getElementById('helpModal')
  modal.classList.remove('hidden')
  console.log('K blev nedtryckt, visar hjälpmodal.')
}

/**
 * Stänger hjälpmodulen.
 */
export function closeHelpModal () {
  const modal = document.getElementById('helpModal')
  modal.classList.add('hidden')
  console.log('Hjälpmodal stängdes ner.')
}

/**
 * Uppdaterar elementets position till mitten av fönstret.
 * @param {HTMLElement} element - Elementet som ska centras.
 */
export function centerElement (element) {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const elementWidth = parseInt(window.getComputedStyle(element).width)
  const elementHeight = parseInt(window.getComputedStyle(element).height)

  element.style.left = `${(windowWidth - elementWidth) / 2}px`
  element.style.top = `${(windowHeight - elementHeight) / 2}px`

  console.log(`Centered element: ID=${element.id}, left=${element.style.left}, top=${element.style.top}`)
}

/**
 * Förändrar storlek på ett element utan att ändra dess centrumposition.
 * @param {HTMLElement} element - Elementet som ska ändras i storlek.
 * @param {number} sizeChange - Förändring i storlek (positiv för förstoring, negativ för förminskning).
 */
export function resizeElement (element, sizeChange) {
  const currentWidth = element.offsetWidth
  const currentHeight = element.offsetHeight

  const newWidth = currentWidth + sizeChange
  const newHeight = currentHeight + sizeChange

  if (newWidth > 2 && newHeight > 2) {
    const currentLeft = parseFloat(element.style.left || 0)
    const currentTop = parseFloat(element.style.top || 0)

    element.style.left = `${currentLeft - sizeChange / 2}px`
    element.style.top = `${currentTop - sizeChange / 2}px`

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`

    console.log(`Ändrad storlek: ID=${element.id}, Ny bredd=${newWidth}px, Ny höjd=${newHeight}px`)
  } else {
    console.log(`För liten storlek för ändring: ID=${element.id}`)
  }
}

/**
 * Kopierar valda element till slumpmässiga positioner.
 * @param {HTMLElement[]} elements - En array av element som ska kopieras.
 */
export function copyElementsToRandomPosition (elements) {
  console.log(`Kopierar ${elements.length} element till slumpmässiga positioner.`)
  elements.forEach((el, index) => {
    const clone = el.cloneNode(true)
    clone.classList.remove('selected')

    const maxWidth = window.innerWidth - el.offsetWidth
    const maxHeight = window.innerHeight - el.offsetHeight
    clone.style.left = `${Math.random() * maxWidth}px`
    clone.style.top = `${Math.random() * maxHeight}px`

    document.body.appendChild(clone)

    console.log(`Kopia skapad: Original-ID=${el.id}, Kopia-Index=${index}`)

    clone.addEventListener('click', (e) => e.target.classList.toggle('selected'))
    clone.addEventListener('dblclick', handleDoubleClick)
  })
}

/**
 * Skapar ett nytt element på en slumpmässig position baserat på en mall.
 * @param {HTMLElement} template - Elementmallen som ska användas för att skapa ett nytt element.
 */
export function createRandomElement (template) {
  console.log('Skapar ett slumpmässigt element baserat på en mall.')
  const randomBox = template.cloneNode(true)

  randomBox.style.left = `${Math.random() * (window.innerWidth - 200)}px`
  randomBox.style.top = `${Math.random() * (window.innerHeight - 200)}px`

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  const isCircle = Math.random() > 0.5
  const shapeClass = isCircle ? 'circle' : ''

  const randomSize = Math.floor(Math.random() * 101) + 50 // Storlek mellan 50 och 150 px

  randomBox.className = `box ${randomColor} ${shapeClass}`
  randomBox.style.width = `${randomSize}px`
  randomBox.style.height = `${randomSize}px`
  randomBox.classList.remove('selected')

  document.body.appendChild(randomBox)

  console.log(`Nytt element skapat: Färg=${randomColor}, Form=${shapeClass}, Storlek=${randomSize}px`)

  randomBox.addEventListener('click', (e) => e.target.classList.toggle('selected'))
  randomBox.addEventListener('dblclick', handleDoubleClick)
}
