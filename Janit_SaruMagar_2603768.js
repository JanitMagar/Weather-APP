const apiKey = "274bd63b9d67a415288666e0a70b8b0a";// OpenWeather API key used to authenticate requests
const defaultCity = "Greenville";// Default city shown when the app loads
function updateDateTime() {// Function to update date and time every second
    const now = new Date();// Create a new Date object with current date & time
    document.getElementById("dateTime").innerText =now.toDateString() + "| " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });// Display formatted date and time in the HTML element with id
}
setInterval(updateDateTime, 1000);// Call updateDateTime every 1000 milliseconds (1 second)
updateDateTime();// Call it once immediately so it appears on page load
async function getWeather(city = defaultCity) {// Async function to fetch weather data
    const cityName = document.getElementById("cityInput").value || city;// Get city name from input field, or use default city
    try {
        const response = await fetch(`http://localhost/Janit_SaruMagar_2603768.php?city=${cityName}`);// Fetch one-day weather data from PHP
        const data = await response.json();// Convert API response to JSON
        console.log(data);
        if (data.cod !== 200) {
            alert("City not found");
            return;
        }// Check if API returned an error
        document.getElementById("cityName").innerText = data.name;// Display city name
        document.getElementById("temp").innerText = `Temperature 🌡️: ${data.main.temp}°C`;// Display temperature
        document.getElementById("desc").innerText = `Description: ${data.weather[0].description}`;// Display weather description
        document.getElementById("humidity").innerText = `Humidity💧: ${data.main.humidity}%`;// Display humidity
        document.getElementById("wind").innerText = `Wind 💨: ${data.wind.speed} m/s`;// Display wind speed
        document.getElementById("windDirection").innerHTML = `Wind Direction🧭: ${(data.wind.deg)}`;// Display wind direction
        document.getElementById("pressure").innerText = `Pressure🔽: ${data.main.pressure} hPa`;// Display pressure
        document.getElementById("sunrise").innerHTML =`Sunrise 🌅: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;// Displays sunrise
        document.getElementById("sunset").innerHTML =`Sunset 🌇: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;// Displays sunset
    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);// Show error alert if fetch fails and log error to console for debugging
    }
}
window.onload = () => {
    getWeather(defaultCity);
};// Run this when the page finishes loading and load weather for default city
