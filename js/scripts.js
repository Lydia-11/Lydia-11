async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = "Edison"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data: ' + response.statusText);
        }
        const data = await response.json();
        
        console.log(data);
        displayWeather(data); 
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    try {
        if (!data || !data.weather || !data.weather[0]) {
            throw new Error('Weather data is missing or invalid.');
        }

        const weatherIcon = document.createElement('img');
        weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        const weatherTemp = document.getElementById('weather-temp');
        weatherTemp.textContent = `${data.main.temp}\u00B0F`;

        const weatherDescription = document.getElementById('weather-description');
        weatherDescription.textContent = data.weather[0].description;

        const weatherContainer = document.getElementById('weather');
        weatherContainer.appendChild(weatherIcon);
    } catch (error) {
        console.error('Error displaying weather data:', error);
    }
}

fetchWeather();



