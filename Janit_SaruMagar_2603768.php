<?php
header("Access-Control-Allow-Origin: *"); // Allow API access from any domain
header("Content-Type: application/json"); // Response format will be JSON
mysqli_report(MYSQLI_REPORT_OFF); // Disable MySQL error warnings

$host = "localhost"; // Database host
$username = "root"; // Database username
$password = ""; // Database password

$conn = mysqli_connect($host, $username, $password); // Connect to MySQL
if (!$conn) {
    echo json_encode(["cod" => 500, "message" => "Database connection failed"]); // Error response
    exit; // Stop execution
}

mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS WeatherApp"); // Create DB if not exists
mysqli_select_db($conn, "WeatherApp"); // Select WeatherApp database

$table = "CREATE TABLE IF NOT EXISTS weather (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique record ID
    city VARCHAR(100),                    -- City name
    temperature FLOAT,                   -- Temperature in Celsius
    description VARCHAR(200),            -- Weather description
    humidity INT,                        -- Humidity percentage
    wind FLOAT,                          -- Wind speed
    pressure INT,                       -- Atmospheric pressure
    wind_deg INT,                       -- Wind direction
    sunrise INT,                        -- Sunrise timestamp
    sunset INT,                         -- Sunset timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record time
)";
mysqli_query($conn, $table); // Create weather table

$city_escape = mysqli_real_escape_string($conn, "SELECT * FROM weather");

$select_query="
select * from weather
where city='$city_escape'
AND created_at >= NOW() - INTERVAL 2 HOUR 
";

$city = $_GET['city'] ?? 'Greenville'; // Get city from URL or default
$apiKey = "Your API KEY"; // OpenWeather API key
$url = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey"; // API URL
$response = file_get_contents($url); // Fetch weather data
$data = json_decode($response, true); // Convert JSON to array

if ($data["cod"] != 200) { // If API error occurs
    echo json_encode($data); // Return API error
    exit;
}

$cityName = $data["name"]; // City name from API
$temp = $data["main"]["temp"]; // Temperature
$desc = $data["weather"][0]["description"]; // Weather description
$humidity = $data["main"]["humidity"]; // Humidity
$wind = $data["wind"]["speed"]; // Wind speed
$pressure = $data["main"]["pressure"]; // Pressure
$wind_deg = $data["wind"]["deg"]; // Wind direction
$sunrise = $data["sys"]["sunrise"]; // Sunrise time
$sunset = $data["sys"]["sunset"]; // Sunset time

$check = "SELECT * FROM weather WHERE city='$cityName'"; // Check if city exists
$result = mysqli_query($conn, $check); // Execute query

if (mysqli_num_rows($result) == 0) { // If city not stored yet
    $insert = "INSERT INTO weather 
        (city, temperature, description, humidity, wind, pressure, wind_deg, sunrise, sunset)
        VALUES 
        ('$cityName','$temp','$desc','$humidity','$wind','$pressure','$wind_deg','$sunrise','$sunset')";
    mysqli_query($conn, $insert); // Insert weather data
}

echo json_encode($data); // Return weather data as JSON
?>

