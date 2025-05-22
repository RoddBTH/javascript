/**
 * Module for handling highscore functionality using sessionStorage.
 * @namespace kmom05.highscore
 */

function getHighscores() {
    const highscores = sessionStorage.getItem('co2Highscores');
    return highscores ? JSON.parse(highscores) : {
        sweden: 0,
        norway: 0,
        denmark: 0
    };
}

function updateHighscores(data, year) {
    const highscores = getHighscores();
    const metrics = ['co2', 'co2_per_capita', 'co2_per_gdp'];
    
    metrics.forEach(metric => {
        const countries = [
            { name: 'sweden', value: data.sweden?.[metric] },
            { name: 'norway', value: data.norway?.[metric] },
            { name: 'denmark', value: data.denmark?.[metric] }
        ].filter(c => c.value !== undefined && c.value !== null);
        
        if (countries.length > 0) {
            countries.sort((a, b) => a.value - b.value);
            const winner = countries[0].name;
            highscores[winner] = (highscores[winner] || 0) + 1;
        }
    });
    
    sessionStorage.setItem('co2Highscores', JSON.stringify(highscores));
}

function displayHighscores() {
    const highscores = getHighscores();
    const display = document.getElementById('highscore-display');
    
    const sorted = Object.entries(highscores)
        .sort((a, b) => b[1] - a[1])
        .map(([country, score]) => ({
            name: country.charAt(0).toUpperCase() + country.slice(1),
            score
        }));
    
    display.innerHTML = sorted.map(item => 
        `<p>${item.name}: ${item.score}</p>`
    ).join('');
}

function clearHighscores() {
    sessionStorage.removeItem('co2Highscores');
}

export { getHighscores, updateHighscores, displayHighscores, clearHighscores };