var API_KEY_NPS = "kUHjUZHYRN3jl4bTe4JwPdZmF3hlpYeIe0rOVhbW";
var API_KEY_WEATHER = "f461f184bb0f987cdbcdefa61ead2cc9";
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
console.log(modal);

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var location = document.getElementById("location").value;

  var parkUrl = "https://developer.nps.gov/api/v1/parks?q="
  + location
  + "&api_key="
  + API_KEY_NPS;

  fetch(parkUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Failed to fetch park data");
      }
      return response.json();
    })
    .then(function(data) {
    
      if (data.total === '0') {
        console.log('this is data', data.total);
        // alert('Not A Valid Input, Please Try Again');
        modal.style.display = "block";
    }

      displayParkInfo(data.data[0]);
      console.log('line 65', data.data[0]);

      var zipCode = data.data[0].addresses[0].postalCode;
      console.log(zipCode);
      getWeather(zipCode);
    })
    .catch(function(error) {
    console.error(error);
     });

  console.log(location);
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function getWeather(zipCode) {
  console.log('inside getWeather')
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" 
  + zipCode
  + "&APPID="
  + API_KEY_WEATHER
  + "&units=imperial";

  console.log('zip inside weather', zipCode);
  console.log(weatherUrl);

  // USE MODALS
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

console.log('line 42', data);

  currentWeather.innerText = `Current Weather: ${data.weather[0].main}, ${data.main.temp}°F`;
  forecast.innerText = `Forecast: ${data.main.temp_min}°F - ${data.main.temp_max}°F`;
}

function displayParkInfo(park) {
  var parkImage = document.getElementById("park-image");
  var parkFacts = document.getElementById("park-facts");
  var parkDirections = document.getElementById("park-directions");

  parkImage.src = park.images[0].url;
  parkImage.alt = park.images[0].altText;
  parkFacts.innerText = park.description;
  parkDirections.innerText = `Directions: ${park.directionsInfo}`;
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


document.querySelector('button').onmousemove = (e) => {

	const x = e.pageX - e.target.offsetLeft
	const y = e.pageY - e.target.offsetTop

	e.target.style.setProperty('--x', `${ x }px`)
	e.target.style.setProperty('--y', `${ y }px`)
}