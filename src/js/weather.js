import { getCurrentWeather } from "./api"
const degElement = document.querySelector('.weather__deg');
const weatherIcon = document.querySelector('.weather__icon');

export const renderCurrentWeather = () => {    
    getCurrentWeather({latitude: localStorage.getItem('lat'), longitude: localStorage.getItem('long')})
    .then((data) => {
        weatherIcon.style.backgroundImage = `url('https://openweathermap.org/img/wn/${data.weather[0].icon}.png')`
        degElement.textContent = Math.round(data.main.temp) + " °C";
    })
}