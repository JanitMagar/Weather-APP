const apiKey = "Your APIKEY";// OpenWeather API key used to authenticate requests
const defaultCity = "DefaultCity";// Default city shown when the app loads
function updateDateTime() {// Function to update date and time every second
    const now = new Date();// Create a new Date object with current date & time
    document.getElementById("dateTime").innerText =now.toDateString() + "| " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });// Display formatted date and time in the HTML element with id
}
setInterval(updateDateTime, 1000);// Call updateDateTime every 1000 milliseconds (1 second)
updateDateTime();// Call it once immediately so it appears on page load
// Async function to fetch weather data for a given city
async function getWeather(city = defaultCity) {
    // Get city name from input field; if empty, use the default city
    const cityName = document.getElementById("cityInput").value || city;
    try {
        const response = await fetch(`PHPCONNECT FILE?city=${cityName}`);
        // Fetch weather data from the PHP backend (which calls OpenWeather API)
        const data = await response.json();// Convert the response to JSON format
        console.log(data);// Log the data to the console for debugging
        if (data.cod !== 200) {
            alert("City not found"); // Show alert if city is invalid
            return; // Stop execution
        }
        document.getElementById("cityName").innerText = data.name;// Display the city name in the HTML element with id="cityName"
        document.getElementById("temp").innerText = `Temperature 🌡️: ${data.main.temp}°C`;// Display the temperature in °C
        document.getElementById("desc").innerText = `Description: ${data.weather[0].description}`;// Display the weather description (e.g., "clear sky", "rainy")
        document.getElementById("humidity").innerText = `Humidity 💧: ${data.main.humidity}%`;// Display the humidity percentage
        document.getElementById("wind").innerText = `Wind 💨: ${data.wind.speed} m/s`;// Display the wind speed in meters per second        
        document.getElementById("windDirection").innerHTML = `Wind Direction 🧭: ${data.wind.deg}`;// Display the wind direction in degrees
        document.getElementById("pressure").innerText = `Pressure 🔽: ${data.main.pressure} hPa`;// Display the atmospheric pressure in hPa
    } catch (error) {
        // Catch any errors from fetch or JSON conversion
        alert("Error fetching weather data"); // Alert user
        console.error(error); // Log the error to console for debugging
    }
}
window.onload = () => {
    getWeather(defaultCity);
};// Run this when the page finishes loading and load weather for default city
