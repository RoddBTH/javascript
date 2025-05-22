/**
 * @namespace kmom02
 * @property {module:animals} animals - Modulen som innehåller djurlistor.
 * @property {module:greeting} greeting - Modulen som innehåller hälsningslogik.
 */

import { africanAnimals, americanAnimals, europeanAnimals } from './modules/kmom02/animals.js'
import getGreeting from './modules/kmom02/greeting.js'

// /**
//  * Returnerar alla djur i en enda array.
//  * @returns {Array} - Samtliga djur.
//  */
// function getAll () {
//   return [...africanAnimals, ...americanAnimals, ...europeanAnimals]
// }

/**
 * Returnerar alla djur från en viss kontinent.
 * @param {string} continent - Namnet på kontinenten (america, africa, europe).
 * @returns {Array} - Djur från den valda kontinenten, eller en tom array.
 */
function getFrom (continent) {
  const map = {
    africa: africanAnimals,
    america: americanAnimals,
    europe: europeanAnimals
  }

  return map[continent.toLowerCase()] || []
}

// Funktion för att visa slumpade djur
/**
 * Visar ett slumpmässigt djur från varje kontinent (Afrika, Amerika, Europa)
 * genom att hämta ett djur från varje kontinent och uppdatera DOM med resultaten.
 */
function showRandomAnimals () {
  const africanAnimal = getFrom('africa')[Math.floor(Math.random() * getFrom('africa').length)]
  const americanAnimal = getFrom('america')[Math.floor(Math.random() * getFrom('america').length)]
  const europeanAnimal = getFrom('europe')[Math.floor(Math.random() * getFrom('europe').length)]

  console.log('Slumpade djur:', africanAnimal, americanAnimal, europeanAnimal) // Logg för att verifiera att vi får djuren

  // Uppdatera DOM med slumpade djur
  document.getElementById('african-animal').textContent = `Afrikanskt djur: ${africanAnimal}`
  document.getElementById('american-animal').textContent = `Amerikanskt djur: ${americanAnimal}`
  document.getElementById('european-animal').textContent = `Europeiskt djur: ${europeanAnimal}`
}

// Funktion för att visa hälsning
/**
 * Visar en hälsning beroende på tid på dagen.
 * Hälsningen baseras på om det är före eller efter 12:00.
 */
function showGreeting () {
  console.log('Visar hälsning') // Logg för att verifiera att vi kör denna funktion
  document.getElementById('greeting').textContent = getGreeting()
}

// Kör funktioner vid sidladdning
document.addEventListener('DOMContentLoaded', () => {
  console.log('Dokumentet har laddats') // Logg när sidan laddas
  showRandomAnimals()
  showGreeting()
})
