const api_key = '2ef7a2b3a52b4e7fadc174847250304';

document.querySelector(".search_icon").addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    fetchWeather();
}
});

function formatDate(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[parseInt(month) - 1];
    return `${day} ${monthName} ${year}`;
}

function formatTime(timeString) {
    // Convert "HH:mm" to 12-hour format with AM/PM
    const [hours, minutes] = timeString.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert 0 to 12
    return `${hour} ${ampm}`;
}

async function fetchWeather() {
    const city = document.getElementById('city').value;
    let url = `http://api.weatherapi.com/v1/forecast.json?key=2ef7a2b3a52b4e7fadc174847250304&q=${city}&days=01&aqi=no`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Update current weather
        const Date_string = data.location.localtime;
        const formattedDate = formatDate(Date_string);
        const location = data.location.name;
        const temp_C = Math.ceil(data.current.temp_c);
        const Condition = data.current.condition.text;
        const Humidity = data.current.humidity;
        const Wind = Math.floor(data.current.wind_kph);
        const rain = data.current.precip_mm;

        // Update DOM for current weather
        document.querySelector(".city").innerHTML = `${location}`;
        document.querySelector(".temperature").innerHTML = `${temp_C}°C`;
        document.querySelector(".wind").innerHTML = `${Wind} km/h`;
        document.querySelector(".humidity").innerHTML = `${Humidity}%`;
        document.querySelector(".condition").innerHTML = `${Condition}`;
        document.querySelector(".Rain").innerHTML = `${rain} mm`;
        document.querySelector(".date").innerHTML = `${formattedDate}`;

        // Get hourly forecast data
        const currentHour = new Date().getHours();
        const hourlyData = data.forecast.forecastday[0].hour;
        const hourlyContainer = document.querySelector(".hourly-forecast");
        hourlyContainer.innerHTML = ''; // Clear previous data

        // Display next 4 hours
        for(let i = 1; i <= 4; i++) {
            const nextHourIndex = (currentHour + i) % 24;
            const hourData = hourlyData[nextHourIndex];
            const hourTemp = Math.round(hourData.temp_c);
            const hourCondition = hourData.condition.text;
            const hourTime = hourData.time.split(' ')[1]; // Get HH:mm
            const formattedTime = formatTime(hourTime); // Convert to 12-hour format
        
            const hourElement = document.createElement('div');
            hourElement.className = 'hour-item';
            hourElement.innerHTML = `
                <p>${formattedTime}</p>
                <p>${hourTemp}°C</p>
                <p>${hourCondition}</p>
            `;
            hourlyContainer.appendChild(hourElement);
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
