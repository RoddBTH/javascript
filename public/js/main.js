console.log('JavaScript ready.')

const today = new Date()
const formattedDate = today.toLocaleDateString('sv-SE', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

console.log(`Hej! Idag är det ${formattedDate}.`)
