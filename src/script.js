let now = new Date();
console.log(now.getDate());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(days);
console.log(now.getDay());
let day = days[now.getDay()];
console.log(day);

let hour = now.getHours();
console.log(hour);

let minutes = now.getMinutes();
console.log(minutes);
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let current = document.querySelector("h5");
current.innerHTML = `${day} ${hour}:${minutes}`;
console.log(current);

let iconMap = {
  Rain: "src/images/lightrain.png",
  Drizzle: "src/images/lightrain.png",
  Thunderstorm: "src/images/lightening.png",
  Snow: "src/images/snow.png",
  Clear: "src/images/sunny.png",
  Clouds: "src/images/cloudy.png",
  Mist: "src/images/lightrain.png",
  Haze: "src/images/cloudy.png",
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["S", "M", "T", "W", "TH", "F", "S"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");

  let forecastHTML = `<div class="row week">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let weatherCondition = forecastDay.weather[0].main;

      forecastHTML =
        forecastHTML +
        `
    
    <div class="col">
      <p class="forecast-temp">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span>|</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </p>
      <div class="forecast-image"> <img class="daily-icon" src="${
        iconMap[weatherCondition]
      }">
      </div>
      
      <p class="forecast-day">${formatDay(forecastDay.dt)}</p>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//City search and Current Temperature:
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e285e913cd6f177ca8795431a5a72d10";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiURL);

  axios.get(apiURL).then(displayForecast);
}

function showTemp(response) {
  console.log(response);
  console.log(response.data.weather[0].main);
  console.log(response.data.wind.speed);
  console.log(response.data.name);
  console.log(response.data.main.temp);

  fahrenheitTemp = response.data.main.temp;
  console.log(fahrenheitTemp);

  let temp = Math.round(fahrenheitTemp);
  console.log(temp);
  let showTemp = document.querySelector(`#showTemp`);
  showTemp.innerHTML = `${temp}`;
  let city = document.querySelector(`#mainCity`);
  city.innerHTML = `${response.data.name}`;
  let speed = Math.round(response.data.wind.speed / 1.609);
  let windSpeed = document.querySelector(`#windSpeed`);
  windSpeed.innerHTML = `Wind Speed: ${speed} MPH`;
  let weatherCondition = response.data.weather[0].main;
  let weatherDescription = document.querySelector(`#weatherDescription`);
  weatherDescription.innerHTML = `${weatherCondition}`;
  let mainIcon = document.querySelector(`#mainImage`);
  mainIcon.src = `${iconMap[weatherCondition]}`;
  console.log(iconMap[weatherCondition]);
  console.log(weatherCondition);

  getForecast(response.data.coord);
  console.log(response.data.coord);
}

function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");

  search(cityInput.value);
}

function search(city) {
  let searchCity = document.querySelector("#searchCity");
  let cityLocation = searchCity.value;
  let units = "imperial";
  let apiKey = "e285e913cd6f177ca8795431a5a72d10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(`${apiUrl}&appid${apiKey}`).then(showTemp);
}

function retrievePosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e285e913cd6f177ca8795431a5a72d10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid${apiKey}`).then(showTemp);
}

function showCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function locationClick(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function nameCity(response) {
  let randomCity = document.querySelector(`#mainCity`);
}

function findOnClick(event) {
  event.preventDefault();
  let cities = [
    "London",
    "Tokyo",
    "Paris",
    "Rome",
    "Washington D.C.",
    "Berlin",
    "Buenos Aires",
    "Bangkok",
  ];

  let randomCity = Math.floor(Math.random() * cities.length);
  console.log(randomCity, cities[randomCity]);
  let apiKey = "e285e913cd6f177ca8795431a5a72d10";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cities[randomCity]}&appid=${apiKey}&units=imperial`;

  axios.get(encodeURI(apiURL)).then(showTemp);
}

function showCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#showTemp");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  console.log(celciusTemp);
  temp.innerHTML = Math.round(celciusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#showTemp");
  temp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

window.addEventListener("load", showCurrentCity);

let form = document.querySelector("#searchbar");
form.addEventListener("submit", findCity);

let getLocation = document.querySelector("#currentLocation");
console.log(getLocation);
getLocation.addEventListener("click", locationClick);

let findLocation = document.querySelector("#randomLocation");
console.log(findLocation);
findLocation.addEventListener("click", findOnClick);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
console.log("fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celciusLink");
console.log("celciusLink");
celciusLink.addEventListener("click", showCelcius);

//when searching for a city, display city name and temperature
//user will click the searchbar, type city name, click submit

//Add current location button
//current location button clicks Geolocation API coordinates,
//display current city and temp using open weather api

//when page loads current location in reflected in the mainicon,
// and city name and temperature.
