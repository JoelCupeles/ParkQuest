var API_KEY_NPS = "kUHjUZHYRN3jl4bTe4JwPdZmF3hlpYeIe0rOVhbW";
var API_KEY_WEATHER = "f461f184bb0f987cdbcdefa61ead2cc9";
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var location = document.getElementById("location").value;

    var parkUrl = "https://developer.nps.gov/api/v1/parks?q=" +
        location +
        "&api_key=" +
        API_KEY_NPS;

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
                modal.style.display = "block";
            }

            for (var i = 0; i < data.total; i++) {
                displayParkInfo(data.data[i], i);
                var zipCode = data.data[i].addresses[0].postalCode;
                getWeather(zipCode, i);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
});

function getWeather(zipCode, index) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipCode +
        "&APPID=" +
        API_KEY_WEATHER +
        "&units=imperial";

    fetch(weatherUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            return response.json();
        })
        .then(function(data) {
            displayWeatherInfo(data, index);
        })
        .catch(function(error) {
            console.error(error);
        });
}

function displayWeatherInfo(data, index) {
    var parkDiv = document.querySelector("[data-index='" + index + "']");
    var weatherDiv = document.createElement('div');
    var currentWeather = document.createElement('div');
    var forecast = document.createElement('div');
    var imgCurrentWeather = document.createElement('img');
    var infoCurrentWeather = document.createElement('div');
    var wind = document.createElement('p');
    var humid = document.createElement('p');

    imgCurrentWeather.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"); // Image
    infoCurrentWeather = "Current Weather: " + data.main.temp + "°F";
    currentWeather.append(imgCurrentWeather, infoCurrentWeather);

    wind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
    humid.textContent = "Humidity: " + data.main.humidity + "%";
    forecast.append(wind, humid);

    weatherDiv.append(currentWeather, forecast);
    var parkInfoSection = parkDiv.querySelector('.park-info-section');
    parkInfoSection.appendChild(weatherDiv);
}

function displayParkInfo(park, index) {
    var parkContainer = document.getElementById('park-container');
    var parkDiv = document.createElement('div');
    var parkTitle = document.createElement('h2');
    var parkContent = document.createElement('div');
    var parkImage = document.createElement('img');
    var parkText = document.createElement('div');
    var parkFacts = document.createElement('p');
    var parkInfoSection = document.createElement('div');
    var parkAddress = document.createElement("div");
    var line1 = document.createElement('p');
    var line2 = document.createElement('p');
    var line3 = document.createElement('p');
    var city = document.createElement('p');
    var stateCode = document.createElement('p');
    var postalCode = document.createElement('p');

    parkDiv.setAttribute('data-index', index);
    parkDiv.setAttribute('class', 'park-info');

    parkTitle.innerText = park.fullName;

    parkImage.setAttribute('src', park.images[0].url);
    parkImage.classList.add('park-image');

    parkFacts.classList.add('park-facts');
    parkFacts.innerText = park.description;

    line1.textContent = park.addresses[0].line1 !== '' ? park.addresses[0].line1 : '';
    line2.textContent = park.addresses[0].line2 !== '' ? park.addresses[0].line2 : '';
    line3.textContent = park.addresses[0].line3 !== '' ? park.addresses[0].line3 : '';
    city.textContent = park.addresses[0].city !== '' ? park.addresses[0].city : '';
    stateCode.textContent = park.addresses[0].stateCode !== '' ? park.addresses[0].stateCode : '';
    postalCode.textContent = park.addresses[0].postalCode !== '' ? park.addresses[0].postalCode : '';

    parkAddress.classList.add('park-address');
    parkAddress.append(line1, line2, line3, city, stateCode, postalCode);

    parkInfoSection.classList.add('park-info-section');
    parkInfoSection.appendChild(parkFacts);
    parkInfoSection.appendChild(parkAddress);

    parkText.appendChild(parkInfoSection);

    parkContent.appendChild(parkImage);
    parkContent.appendChild(parkText);

    parkDiv.appendChild(parkTitle);
    parkDiv.appendChild(parkContent);

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