/**
 * Module for fetching and processing CO2 data.
 * @namespace kmom05.co2Data
 */
const sweUrl = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/sweden.json';
const norUrl = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/norway.json';
const denUrl = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/denmark.json';

/**
 * Fetches CO2 data for all countries for a specific year.
 * @param {number} year - Year to fetch data for.
 * @returns {Promise<Object>} Object containing data for all countries.
 */
async function fetchAllData(year) {
    try {
        // Fetch all country data in parallel
        const [sweResponse, norResponse, denResponse] = await Promise.all([
            fetch(sweUrl),
            fetch(norUrl),
            fetch(denUrl)
        ]);

        // Check if all responses are OK
        if (!sweResponse.ok || !norResponse.ok || !denResponse.ok) {
            throw new Error('Failed to fetch one or more country datasets');
        }

        // Parse all JSON responses
        const [sweData, norData, denData] = await Promise.all([
            sweResponse.json(),
            norResponse.json(),
            denResponse.json()
        ]);

        // The data is an object where each key is a year string
        // Convert to array format for easier processing
        const sweArray = Object.values(sweData);
        const norArray = Object.values(norData);
        const denArray = Object.values(denData);

        // Find data for the specified year in each dataset
        const sweYearData = sweArray.find(item => item.year === year) || null;
        const norYearData = norArray.find(item => item.year === year) || null;
        const denYearData = denArray.find(item => item.year === year) || null;

        return {
            sweden: sweYearData,
            norway: norYearData,
            denmark: denYearData,
            year: year
        };
    } catch (error) {
        console.error('Error fetching country data:', error);
        throw error;
    }
}

/**
 * Creates a comparison table from the data.
 * @param {Object} data - Data for all countries.
 * @param {number} year - The year being displayed.
 * @returns {HTMLElement} The created table element.
 */
function createComparisonTable(data, year) {
    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = [
        'Country', 
        'CO2 (tonnes)', 
        'CO2 per capita (tonnes)', 
        'CO2 per GDP (kg per int-$)', 
        'Methane (tonnes)', 
        'Nitrous Oxide (tonnes)'
    ];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Process each country's data
    const countries = [
        { name: 'Sweden', key: 'sweden', data: data.sweden },
        { name: 'Norway', key: 'norway', data: data.norway },
        { name: 'Denmark', key: 'denmark', data: data.denmark }
    ].filter(country => country.data !== null);
    
    if (countries.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = headers.length;
        cell.textContent = 'No data available for selected year';
        row.appendChild(cell);
        tbody.appendChild(row);
        table.appendChild(tbody);
        return table;
    }
    
    // Find best and worst values for each metric
    const metrics = [
        { key: 'co2', best: 'min', name: 'CO2' },
        { key: 'co2_per_capita', best: 'min', name: 'CO2 per capita' },
        { key: 'co2_per_gdp', best: 'min', name: 'CO2 per GDP' },
        { key: 'methane', best: 'min', name: 'Methane' },
        { key: 'nitrous_oxide', best: 'min', name: 'Nitrous Oxide' }
    ];
    
    const bestValues = {};
    
    metrics.forEach(metric => {
        const values = countries.map(country => ({
            country: country.key,
            value: country.data[metric.key]
        })).filter(item => item.value !== undefined && item.value !== null);
        
        if (values.length > 0) {
            if (metric.best === 'min') {
                values.sort((a, b) => a.value - b.value);
            } else {
                values.sort((a, b) => b.value - a.value);
            }
            
            bestValues[metric.key] = {
                best: values[0].country,
                worst: values[values.length - 1].country
            };
        }
    });
    
    // Create rows for each country
    countries.forEach(country => {
        const row = document.createElement('tr');
        
        // Country name
        const nameCell = document.createElement('td');
        nameCell.textContent = country.name;
        row.appendChild(nameCell);
        
        // Add data cells
        metrics.forEach(metric => {
            const cell = document.createElement('td');
            const value = country.data[metric.key];
            
            if (value !== undefined && value !== null) {
                cell.textContent = typeof value === 'number' ? value.toFixed(2) : value;
                
                // Highlight best and worst
                if (bestValues[metric.key]) {
                    if (country.key === bestValues[metric.key].best) {
                        cell.classList.add('winner');
                    } else if (country.key === bestValues[metric.key].worst) {
                        cell.classList.add('loser');
                    }
                }
            } else {
                cell.textContent = 'N/A';
            }
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    return table;
}

export { fetchAllData, createComparisonTable };