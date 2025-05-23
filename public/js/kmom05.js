/**
 * Main module for kmom05 - CO2 Emissions comparison.
 * @namespace kmom05
 * @author Lucas Huynh (luhu23)
 */
import * as co2Data from './modules/kmom05/co2Data.js'
import * as highscore from './modules/kmom05/highscore.js'

document.addEventListener('DOMContentLoaded', () => {
  // Populate year dropdown
  const yearSelect = document.getElementById('year-select')
  for (let year = 1900; year <= 2019; year++) {
    const option = document.createElement('option')
    option.value = year
    option.textContent = year
    yearSelect.appendChild(option)
  }

  yearSelect.addEventListener('change', () => {
    const selectedYear = parseInt(yearSelect.value)
    if (selectedYear) {
      fetchAndDisplayData(selectedYear)
    }
  })

  // Event listeners
  // document.getElementById('fetch-data').addEventListener('click', fetchAndDisplayData);
  document.getElementById('clear-storage').addEventListener('click', () => {
    highscore.clearHighscores()
    highscore.displayHighscores()
  })

  // Display initial highscores
  highscore.displayHighscores()
})

/**
 * Fetches CO2 data for selected year and displays it in a table.
 * @async
 * @function fetchAndDisplayData
 * @param {number} selectedYear - The year between 1900-2019 to fetch CO2 emissions data for.
 * @throws {Error} If data fetching fails or no data is available.
 * @returns {Promise<void>}
 */
async function fetchAndDisplayData (selectedYear) {
  const loadingElement = document.getElementById('loading')

  if (!selectedYear) {
    alert('Please select a year first!')
    return
  }

  try {
    // Show loading indicator
    if (loadingElement) {
      loadingElement.style.display = 'block'
    }

    // Fetch data for all countries
    const data = await co2Data.fetchAllData(selectedYear)
    if (!data || data.length === 0) {
      alert('No data available for the selected year.')
      return
    }

    // Create and display table
    const table = co2Data.createComparisonTable(data, selectedYear)
    const tableContainer = document.getElementById('table-container')
    if (tableContainer) {
      tableContainer.innerHTML = ''
      tableContainer.appendChild(table)
    }

    // Update highscores
    highscore.updateHighscores(data, selectedYear)
    highscore.displayHighscores()
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to fetch data. Please try again.')
  } finally {
    // Hide loading indicator
    if (loadingElement) {
      loadingElement.style.display = 'none'
    }
  }
}
