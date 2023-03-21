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

//   document.getElementById("search-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const state = document.getElementById("location").value.trim();

//     if (state) {
//       getParks(state, 5);
//     }
//   });

//   async function getParks(state, limit) {
//     const apiKeyPark = "Rzz58GZ8JkegAYxNTbOq1ozAjKlgrXgZc7JTHCuH"; 
//     const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&stateCode=${state}&api_key=${apiKeyPark}`;

//     try {
//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         const parks = data.data;
//         displayParks(parks);
//       } else {
//         console.error("Error fetching park data:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching park data:", error);
//     }
//   }

//   function displayParks(parks) {
//     const parkInfoDiv = document.getElementById("park-info");
//     parkInfoDiv.innerHTML = "";

//     parks.forEach((park) => {
//       const parkDiv = document.createElement("div");
//       parkDiv.innerHTML = `
//         <h2>${park.fullName}</h2>
//         <img src="${park.images.length > 0 ? park.images[0].url : '#'}" alt="${park.images.length > 0 ? park.images[0].altText : 'Park Image'}" />
//         <p>${park.description}</p>
//         <p><a href="${park.url}" target="_blank">Visit Park Website</a></p>
//       `;
//       parkInfoDiv.appendChild(parkDiv);
//     });
//   }
