// script.js
const api_key = '2ef7a2b3a52b4e7fadc174847250304';

document.getElementById('submit').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    fetchWeather();
}
});
async function fetchWeather() {
const city = document.getElementById('city').value;
let url = 'http://api.weatherapi.com/v1/current.json?key=2ef7a2b3a52b4e7fadc174847250304&q=' + city + '&aqi=no';
const response = await fetch(url);
const data = await response.json();
console.log(data);
const location = data.location.name;
const temp_C = Math.ceil(data.current.temp_c);
const Condition = data.current.condition.text;
console.log(Condition);
// const Humidity = data.current.humidity;
// const Wind = data.current.wind_kph;
const feels_like = data.current.feelslike_c
document.querySelector(".city").innerHTML = `📍${location}`;
document.querySelector(".temp").innerHTML = `${temp_C}°`;
document.querySelector(".Feels_like").innerHTML = `Feels like: ${feels_like}°`;
}
fetchWeather();