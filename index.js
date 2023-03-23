
var API_KEY_NPS = "kUHjUZHYRN3jl4bTe4JwPdZmF3hlpYeIe0rOVhbW";
var API_KEY_WEATHER = "f461f184bb0f987cdbcdefa61ead2cc9";

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
        alert('Not A Valid Input, Please Try Again');
      } else {
        displayParkInfo(data.data[0]);
        var zipCode = data.data[0].addresses[0].postalCode;
        getWeather(zipCode);
      }
    })
    .catch(function(error) {
      console.error(error);
    });

  console.log(location);
});

function getWeather(zipCode) {
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" 
  + zipCode
  + "&APPID="
  + API_KEY_WEATHER
  + "&units=imperial";

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

function displayParkInfo(park) {
  var parkImage = document.getElementById("park-image");
  var parkFacts = document.getElementById("park-facts");
  var parkDirections = document.getElementById("park-directions");

  parkImage.src = park.images[0].url;
  parkImage.alt = park.images[0].altText;
  parkFacts.innerText = park.description;
  parkDirections.innerText = `Directions: ${park.directionsInfo}`;
}

document.querySelector('button').onmousemove = (e) => {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty('--x', `${ x }px`);
  e.target.style.setProperty('--y', `${ y }px`);
};

// Get the modal and other elements
const contactModal = document.getElementById('contactModal');
const contactLink = document.querySelector('.nav-item a[href="#contact"]');
const closeContactBtn = document.querySelector('.close-contact');

// Open the modal when "Contact Us" link is clicked
contactLink.addEventListener('click', (event) => {
  event.preventDefault();
  contactModal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeContactBtn.addEventListener('click', () => {
  contactModal.style.display = 'none';
});

// Close the modal when the user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });