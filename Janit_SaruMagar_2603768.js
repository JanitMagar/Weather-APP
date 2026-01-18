// Get references to DOM elements
let button = document.getElementById("button");
let cityNameElement = document.getElementById("cityName");
let tempElement = document.getElementById("temp");
let descElement = document.getElementById("desc");
let humidityElement = document.getElementById("humidity");
let windElement = document.getElementById("wind");
let windDirectionElement = document.getElementById("windDirection");
let pressureElement = document.getElementById("pressure");
let sunriseElement = document.getElementById("sunrise");
let sunsetElement = document.getElementById("sunset");
let dateTimeElement = document.getElementById("dateTime");

const defaultCity = "Greenville";

// Function to update date and time every second
function updateDateTime() {
    const now = new Date();
    dateTimeElement.innerText =
        now.toDateString() + " | " +
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}
setInterval(updateDateTime, 1000);
updateDateTime(); // Run once immediately

// Async function to fetch weather data
async function getWeather(cityName) {
    let respond = await fetch(
        `http://localhost/ASSESMENTS/Janit_SaruMagar_2603768.php?city=${cityName}`
    );
    let data = await respond.json();
    console.log(data);

    if (data.cod !== 200) {
        alert("City not found");
        return;
    }

    cityNameElement.innerText = data.name;
    tempElement.innerText = `Temperature 🌡️: ${data.main.temp}°C`;
    descElement.innerText = `Description: ${data.weather[0].description}`;
    humidityElement.innerText = `Humidity 💧: ${data.main.humidity}%`;
    windElement.innerText = `Wind 💨: ${data.wind.speed} m/s`;
    windDirectionElement.innerHTML = `Wind Direction 🧭: ${data.wind.deg}`;
    pressureElement.innerText = `Pressure 🔽: ${data.main.pressure} hPa`;
    sunriseElement.innerText = `Sunrise 🌅: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    sunsetElement.innerText = `Sunset 🌇: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

// Load default city weather on page load
getWeather(defaultCity);

// Add event listener for button click
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let cityInput = document.getElementById("cityInput").value.trim();
    getWeather(cityInput || defaultCity);
});
