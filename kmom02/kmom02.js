import { africanAnimals, americanAnimals, europeanAnimals } from './animals.js'

/**
 * Returnerar alla djur i en enda array.
 * @returns {Array} - Samtliga djur.
 */
function getAll () {
  return [...africanAnimals, ...americanAnimals, ...europeanAnimals]
}

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

/**
 * Filtrerar djur baserat på en sträng.
 * @param {string} query - Strängen att matcha mot.
 * @returns {Array} - Djur som delvis matchar strängen, eller en tom array.
 */
function filterAnimals (query) {
  const allAnimals = getAll()
  return allAnimals.filter(animal => animal.toLowerCase().includes(query.toLowerCase()))
}

/**
 * Returnerar vilken kontinent ett djur finns på.
 * @param {string} animal - Djurets namn.
 * @returns {string} - Kontinentnamn ("Africa", "America", "Europe") eller "Unavailable".
 */
function whereLives (animal) {
  if (africanAnimals.includes(animal)) return 'Africa'
  if (americanAnimals.includes(animal)) return 'America'
  if (europeanAnimals.includes(animal)) return 'Europe'
  return 'Unavailable'
}

/**
 * Skapar en rapport över alla djur och deras kontinent och index.
 * @returns {string} - En formaterad rapport.
 */
function report () {
  const allReports = []

  africanAnimals.forEach((animal, index) => {
    allReports.push(`Africa: ${animal} (${index})`)
  })

  americanAnimals.forEach((animal, index) => {
    allReports.push(`America: ${animal} (${index})`)
  })

  europeanAnimals.forEach((animal, index) => {
    allReports.push(`Europe: ${animal} (${index})`)
  })

  return allReports.join('\n')
}

// Exportera funktionerna
export { getAll, getFrom, filterAnimals, whereLives, report }
