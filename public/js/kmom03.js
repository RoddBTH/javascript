/**
 * @namespace kmom03
 * @property {module:info} info - Modulen som innehåller data som `colors`, `persons`, och `years`.
 * @property {Function} createForm - Skapar och lägger till en form på sidan.
 * @property {Function} displayDetails - Visar namn, logga och år när en form klickas.
 * @property {Function} start - Hanterar skapandet av alla former och knappen.
 */

import { colors, persons, years } from './modules/kmom03/info.js'

/**
 * @namespace kmom03
 */
/**
 * Skapar och lägger till en form på sidan.
 * @param {number} index - Index för vilken form som ska skapas.
 */
function createForm (index) {
  const formContainer = document.getElementById('form-container')

  // Skapa ett div-element för formen
  const form = document.createElement('div')
  form.classList.add('form')
  form.style.backgroundColor = colors[index] // Använd färgen från colors-arrayen
  form.setAttribute('data-index', index)

  // Lägg till eventlyssnare för muspekare
  form.addEventListener('mouseenter', () => {
    form.style.border = '4px solid black' // Lägg till ram när musen är på formen
  })

  form.addEventListener('mouseleave', () => {
    form.style.border = '' // Ta bort ram när musen går bort
  })

  // Lägg till eventlyssnare för att klicka på formen
  form.addEventListener('click', () => {
    displayDetails(index, form) // Skicka formen som argument
  })

  // Lägg till formen i containern
  formContainer.appendChild(form)
}

/**
 * Visar namn, logga och år när man klickar på en form.
 * @param {number} index - Index för den klickade formen.
 * @param {HTMLElement} form - Den klickade formen.
 */
function displayDetails (index, form) {
  // Om detaljerna redan finns, ta bort dem först
  const existingDetails = form.querySelector('.details')
  if (existingDetails) {
    existingDetails.remove()
  }

  // Skapa text och bild för den klickade formen
  const name = persons[index]
  const year = years[index]

  const detailsContainer = document.createElement('div')
  detailsContainer.classList.add('details') // Lägg till en klass för detaljer

  // Skapa namn, logotyp och år som separata element
  const nameElement = document.createElement('p')
  nameElement.textContent = name

  const imgElement = document.createElement('img')
  imgElement.src = 'img/logo.png' // Ladda bilden från rätt relativ sökväg
  imgElement.alt = 'Logo'
  imgElement.style.maxWidth = '90px' // Justera storleken på logotypen
  imgElement.style.maxHeight = '90px'

  const yearElement = document.createElement('p')
  yearElement.textContent = year

  // Lägg till elementen i rätt ordning
  detailsContainer.appendChild(nameElement) // Namn först
  detailsContainer.appendChild(imgElement) // Logotyp i mitten
  detailsContainer.appendChild(yearElement) // Årtal sist

  // Lägg till detailsContainer till formen
  form.appendChild(detailsContainer)
}

/**
 * Hanterar skapandet av alla former och knappen.
 */
function start () {
  const button = document.getElementById('startButton')
  const formContainer = document.getElementById('form-container')

  let currentIndex = 0

  // Lägg till eventlyssnare för knappen
  button.addEventListener('click', () => {
    if (currentIndex < colors.length) {
      createForm(currentIndex)
      button.innerHTML = `Nästa form (${currentIndex + 1})` // Uppdatera knapptext
      currentIndex++
    } else {
      button.style.display = 'none' // Ta bort knappen när alla former är skapade
    }
    formContainer.style.backgroundColor = '#333'
    formContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)'
  })
}

/**
 * Kör startfunktionen när dokumentet är klart.
 */
document.addEventListener('DOMContentLoaded', start)
