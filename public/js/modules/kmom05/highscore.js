/**
 * Module for handling highscore functionality using sessionStorage.
 * @namespace kmom05.highscore
 * @author Lucas Huynh (luhu23)
 * @version 1.0.0
 */

/**
 * Retrieves the current highscores from sessionStorage.
 * @function getHighscores
 * @returns {object} An object containing the current highscores for Sweden, Norway, and Denmark.
 */
function getHighscores () {
  const highscores = sessionStorage.getItem('co2Highscores')
  return highscores
    ? JSON.parse(highscores)
    : {
        sweden: 0,
        norway: 0,
        denmark: 0
      }
}

/**
 * Updates highscores based on the current year's data.
 * Awards 1 point to the country with the most metric wins for the year.
 * @function updateHighscores
 * @param {object} data - The CO2 data object containing metrics for each country.
 * @param {number} year - The year being processed (1900-2019).
 */
function updateHighscores (data, year) {
  const highscores = getHighscores()
  const metrics = ['co2', 'co2_per_capita', 'co2_per_gdp', 'share_global_co2', 'cumulative_co2']

  // Count wins per country for this year
  const yearWins = {
    sweden: 0,
    norway: 0,
    denmark: 0
  }

  // Check each metric
  metrics.forEach(metric => {
    const countries = [
      { name: 'sweden', value: data.sweden?.[metric] },
      { name: 'norway', value: data.norway?.[metric] },
      { name: 'denmark', value: data.denmark?.[metric] }
    ].filter(c => c.value !== undefined && c.value !== null)

    if (countries.length > 0) {
      countries.sort((a, b) => a.value - b.value)
      const winner = countries[0].name
      yearWins[winner]++
    }
  })

  // Find which country had the most wins this year
  const yearWinner = Object.entries(yearWins)
    .sort((a, b) => b[1] - a[1])[0]

  // Only award 1 point if there was a clear winner
  if (yearWinner[1] > 0) {
    highscores[yearWinner[0]] = (highscores[yearWinner[0]] || 0) + 1
  }

  sessionStorage.setItem('co2Highscores', JSON.stringify(highscores))
}

/**
 * Displays the current highscores on the page.
 * @function displayHighscores
 */
function displayHighscores () {
  const highscores = getHighscores()
  const display = document.getElementById('highscore-display')

  const sorted = Object.entries(highscores)
    .sort((a, b) => b[1] - a[1])
    .map(([country, score]) => ({
      name: country.charAt(0).toUpperCase() + country.slice(1),
      score
    }))

  display.innerHTML = sorted.map(item =>
        `<p>${item.name}: ${item.score}</p>`
  ).join('')
}

/**
 * Clears all highscores from sessionStorage and reloads the page.
 * @function clearHighscores
 */
function clearHighscores () {
  sessionStorage.removeItem('co2Highscores')
  console.log(`Storage Cleared at ${new Date().toLocaleTimeString()}`)
  window.location.reload()
}

export { getHighscores, updateHighscores, displayHighscores, clearHighscores }
