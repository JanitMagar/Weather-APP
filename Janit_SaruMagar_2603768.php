<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Content-Type: application/json"); // Set content type to JSON
mysqli_report(MYSQLI_REPORT_OFF); // Disable MySQLi error reporting
$host = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password);
if (!$conn) {
    die(json_encode(["cod" => 500, "message" => "Database connection failed"]));
}
mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS WeatherApp");
mysqli_select_db($conn, "WeatherApp");
$table = "CREATE TABLE IF NOT EXISTS weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100),
    temperature FLOAT,
    description VARCHAR(200),
    humidity INT,
    wind FLOAT,
    pressure INT,
    wind_deg INT,
    sunrise INT,
    sunset INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
mysqli_query($conn, $table);
$city = $_GET['city'] ?? 'Greenville';
$apiKey = "Your APIKEY";
$url = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey";

$response = file_get_contents($url);
$data = json_decode($response, true);
if ($data["cod"] != 200) {
    echo json_encode($data);
    exit;
}
$cityName = $data["name"];
$temp = $data["main"]["temp"];
$desc = $data["weather"][0]["description"];
$humidity = $data["main"]["humidity"];
$wind = $data["wind"]["speed"];
$pressure = $data["main"]["pressure"];
$wind_deg = $data["wind"]["deg"];
$sunrise = $data["sys"]["sunrise"];
$sunset = $data["sys"]["sunset"];
$check = "SELECT * FROM weather WHERE city='$cityName'";
$result = mysqli_query($conn, $check);

if (mysqli_num_rows($result) == 0) {
    $insert = "INSERT INTO weather 
        (city, temperature, description, humidity, wind, pressure, wind_deg, sunrise, sunset)
        VALUES 
        ('$cityName','$temp','$desc','$humidity','$wind','$pressure','$wind_deg','$sunrise','$sunset')";
    mysqli_query($conn, $insert);
}
header('Content-Type: application/json');
echo json_encode($data);
?>

