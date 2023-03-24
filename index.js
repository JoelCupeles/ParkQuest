
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

  document.getElementById("park-container").innerHTML = "";

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
  var forecast = document.createElement('div');
  var imgCurrentWeather = document.createElement('img');
  var infoCurrentWeather = document.createElement('div');

  // console.log(currentWeather);
  // console.log(forecast);
  //console.log('line 103', data);
  //console.log(data.weather[0]);

  imgCurrentWeather.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"); // Image
  infoCurrentWeather = "Current Weather: " + data.main.temp + "°F";

  currentWeather.append(imgCurrentWeather,infoCurrentWeather);

  forecast.innerText = "Forecast: " + data.main.temp_min + "°F - " + data.main.temp_max + "°F";

  weatherDiv.append(currentWeather, forecast);
  parkDiv.appendChild(weatherDiv);
}

function displayParkInfo(park, index) {
  var parkContainer = document.getElementById('park-container');
  var parkDiv = document.createElement('div');
  var parkTitle = document.createElement('p');
  var parkImage = document.createElement('img');
  var parkFacts = document.createElement('p');
  var parkAddress = document.createElement("div");

  parkDiv.setAttribute('data-index', index)
  parkDiv.setAttribute('class', 'park-info')
  parkTitle.innerText = park.fullName;
  // console.log(park.fullName);
  parkImage.setAttribute('src', park.images[0].url);
  // parkImage.alt = park.images[0].altText;
  parkFacts.innerText = park.description;
  
  parkAddress.innerText = "Address: " + '\n' +
  park.addresses[0].line1 + '\n' +
  park.addresses[0].line2 + '\n' +
  park.addresses[0].line3 + '\n' +
  park.addresses[0].city + '\n' +
  park.addresses[0].stateCode + '\n' +
  park.addresses[0].postalCode;

  //parkDirections.innerText = "Directions:" + park.directionsInfo;

  parkDiv.append(parkTitle,parkImage,parkFacts,parkAddress);
  parkContainer.appendChild(parkDiv);

}


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

const aboutLink = document.querySelector('.nav-item a[href="#about"]');
const aboutPopup = document.getElementById('aboutPopup');
const closeBtn = document.querySelector('.close');

aboutLink.addEventListener('click', (event) => {
  event.preventDefault();
  aboutPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  aboutPopup.style.display = 'none';
});


window.addEventListener('click', (event) => {
  if (event.target === aboutPopup) {
    aboutPopup.style.display = 'none';
  }
});
