/**
 * Returnerar en hälsning baserat på tiden på dagen.
 * @returns {string} Hälsning: "God förmiddag" eller "God eftermiddag".
 */
function getGreeting () {
  const currentHour = new Date().getHours()
  return currentHour < 12 ? 'God förmiddag' : 'God eftermiddag'
}

export default getGreeting
