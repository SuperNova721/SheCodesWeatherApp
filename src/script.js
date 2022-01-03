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
};

//City search and Current Temperature:
function showTemp(response) {
  console.log(response.data.weather[0].main);
  console.log(response.data.wind.speed);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  if (temp < 10) {
    temp = `0${temp}`;
  }
  let showTemp = document.querySelector(`#showTemp`);
  showTemp.innerHTML = `${temp}`;
  let city = document.querySelector(`#mainCity`);
  city.innerHTML = `${response.data.name}`;
  let speed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(`#windSpeed`);
  windSpeed.innerHTML = `Wind Speed: ${speed}`;
  let weatherCondition = response.data.weather[0].main;
  let weatherDescription = document.querySelector(`#weatherDescription`);
  weatherDescription.innerHTML = `${weatherCondition}`;
  let mainIcon = document.querySelector(`#mainImage`);
  mainIcon.src = `${iconMap[weatherCondition]}`;
  console.log(iconMap[weatherCondition]);
  console.log(weatherCondition);
}
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");

  search(cityInput.value);
}
function search(city) {
  let searchCity = document.querySelector("#searchCity");
  let cityLocation = searchCity.value;
  let units = "metric";
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid${apiKey}`).then(showTemp);
}

function locationClick(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let form = document.querySelector("#searchbar");
form.addEventListener("submit", findCity);

let getLocation = document.querySelector("#currentLocation");
console.log(getLocation);
getLocation.addEventListener("click", locationClick);

//when searching for a city, display city name and temperature
//user will click the searchbar, type city name, click submit

//Add current location button
//current location button clicks Geolocation API coordinates,
//display current city and temp using open weather api
