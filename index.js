var API_KEY_NPS = "kUHjUZHYRN3jl4bTe4JwPdZmF3hlpYeIe0rOVhbW";
var API_KEY_WEATHER = "f461f184bb0f987cdbcdefa61ead2cc9";

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var location = document.getElementById("location").value;

  getWeather(location);
  getParks(location);
});

function getWeather(location) {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY_WEATHER}&units=imperial`;

  fetch(weatherUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then(function(data) {
      displayWeatherInfo(data);
    })
    .catch(function(error) {
      console.error(error);
    });
}

function displayWeatherInfo(data) {
  const currentWeather = document.getElementById("current-weather");
  const forecast = document.getElementById("forecast");

  currentWeather.innerText = `Current Weather: ${data.weather[0].main}, ${data.main.temp}°F`;
  forecast.innerText = `Forecast: ${data.main.temp_min}°F - ${data.main.temp_max}°F`;
}