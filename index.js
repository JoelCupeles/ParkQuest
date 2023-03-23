var API_KEY_NPS = "kUHjUZHYRN3jl4bTe4JwPdZmF3hlpYeIe0rOVhbW";
var API_KEY_WEATHER = "f461f184bb0f987cdbcdefa61ead2cc9";
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// console.log(modal);

// //hide function//
// const about = document.getElementById("about")

// about.addEventListener("click", function (){
//   about.classList.add('hide')
// })


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
      console.log('data', data);
      if (data.total === '0') {
        console.log('this is data', data.total);
        // alert('Not A Valid Input, Please Try Again'); - changed to use modals
        modal.style.display = "block";
    }

    for (var i = 0; i < data.total; i++) {

      displayParkInfo(data.data[i],i);
      //console.log('data', data);
      //console.log('data.total', data.total);
      //console.log('data.list', data.data[i]);

      var zipCode = data.data[i].addresses[0].postalCode;
      console.log(zipCode);
      getWeather(zipCode, i);
    }
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

function getWeather(zipCode, index) {
  //console.log('inside getWeather')
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" 
  + zipCode
  + "&APPID="
  + API_KEY_WEATHER
  + "&units=imperial";

  console.log('zip inside weather', zipCode);
  //console.log(weatherUrl);

  // USE MODALS
  fetch(weatherUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then(function(data) {
      //console.log('line 79', data);
      displayWeatherInfo(data, index);
    })
    .catch(function(error) {
      console.error(error);
    });
}

function displayWeatherInfo(data, index) {
  // const currentWeather = document.getElementById("current-weather");
  // const forecast = document.getElementById("forecast");

  var parkDiv = document.querySelector("[data-index='"+ index + "']");
  var weatherDiv = document.createElement('div');
  var currentWeather = document.createElement('div');
  var forecast = document.createElement('h2');

  // console.log(currentWeather);
  // console.log(forecast);
  // console.log('line 42', data);
  // console.log(parkDiv);

  currentWeather.innerText = "Current Weather: " + data.weather[0].main + " " + data.main.temp + "°F";
  forecast.innerText = "Forecast: " + data.main.temp_min + "°F - " + data.main.temp_max + "°F";

  weatherDiv.append(currentWeather, forecast);
  parkDiv.appendChild(weatherDiv);
}

function displayParkInfo(park, index) {
  // var parkImage = document.getElementById("park-image");
  // var parkFacts = document.getElementById("park-facts");
  // var parkDirections = document.getElementById("park-directions");
  var parkContainer = document.getElementById('park-container');
  //parkContainer.innerHTML = '';
  var parkDiv = document.createElement('div');
  var parkTitle = document.createElement('h2');
  var parkImage = document.createElement('img');
  var parkFacts = document.createElement('p');
  var parkDirections = document.createElement("div");

  parkDiv.setAttribute('class', 'park-info')
  parkImage.setAttribute('src', park.images[0].url);
  
  parkDiv.setAttribute('data-index', index)
  // parkImage.src = park.images[0].url;
  parkImage.alt = park.images[0].altText;
  parkFacts.innerText = park.description;
  parkDirections.innerText = "Directions:" + park.directionsInfo;

  parkDiv.append(parkTitle,parkImage,parkFacts,parkDirections);
  parkContainer.appendChild(parkDiv);

}