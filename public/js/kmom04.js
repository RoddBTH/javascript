/**
 * Namespace för alla funktioner relaterade till kmom04.
 * @namespace kmom04
 * @property {module:keyboardEvents} keyboardEvents - Innehåller alla keyboardEvents.
 * @property {module:mouseEvents} mouseEvents - Innehåller alla mouseEvents.
 */

import {
  showHelpModal,
  closeHelpModal,
  centerElement,
  resizeElement,
  copyElementsToRandomPosition,
  createRandomElement
} from './modules/kmom04/keyboardevents.js'

import {
  toggleSelectedClass,
  handleDoubleClick
} from './modules/kmom04/mouseEvents.js';

(() => {
  'use strict'

  // Hjälpmodalt fönster - Visa/dölj hjälp
  document.addEventListener('keydown', (e) => {
    if (e.key === 'k') {
      showHelpModal()
    }
  })

  /**
   * Stänger hjälpmodulen när användaren klickar på stäng-knappen.
   */
  document.getElementById('closeHelp').addEventListener('click', closeHelpModal)

  // Hämta element
  const box1 = document.getElementById('box1')

  // Centrera #box1 när sidan laddas
  centerElement(box1)

  // Event: När fönstrets storlek ändras
  window.addEventListener('resize', () => {
    console.log('Fönsterstorlek ändrad, centrerar box1 igen.')
    centerElement(box1)
  })

  // Event: Växla outline vid klick
  box1.addEventListener('click', toggleSelectedClass)

  // Event: Försvinn vid dubbelklick
  box1.addEventListener('dblclick', handleDoubleClick)

  // Tangentbordslyssnare för att interagera med element
  document.addEventListener('keydown', (e) => {
    const selectedElements = document.querySelectorAll('.selected')

    switch (e.key) {
      case 'e':
        // Växla form mellan cirkel och fyrkant
        selectedElements.forEach((el) => el.classList.toggle('circle'))
        break

      case 'q':
        // Förstora
        selectedElements.forEach((el) => resizeElement(el, 10))
        break

      case 'w':
        // Förminska
        selectedElements.forEach((el) => resizeElement(el, -10))
        break

      case 'r':
        // Byt färg
        selectedElements.forEach((el) => {
          const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
          const currentColor = colors.findIndex((color) => el.classList.contains(color))
          el.classList.remove(colors[currentColor])
          el.classList.add(colors[(currentColor + 1) % colors.length])
        })
        break

      case 't':
        copyElementsToRandomPosition(selectedElements)
        break

      case 'y':
        // Radera valda element
        selectedElements.forEach((el) => el.remove())
        break

      case 'u':
        // Avmarkera alla
        selectedElements.forEach((el) => el.classList.remove('selected'))
        break

      case 'i':
        // Markera alla
        document.querySelectorAll('.box').forEach((el) => el.classList.add('selected'))
        break

      case 'p':
        createRandomElement(box1)
        break

      case 'ArrowUp':
        selectedElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top > 0) el.style.top = `${rect.top - 10}px`
        })
        break

      case 'ArrowDown':
        selectedElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.bottom < window.innerHeight) el.style.top = `${rect.top + 10}px`
        })
        break

      case 'ArrowLeft':
        selectedElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.left > 0) el.style.left = `${rect.left - 10}px`
        })
        break

      case 'ArrowRight':
        selectedElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.right < window.innerWidth) el.style.left = `${rect.left + 10}px`
        })
        break
    }
  })
})()
