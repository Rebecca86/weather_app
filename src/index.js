function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let dailyHTMLElement = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let dayName = formatForecastDay(day.time);
      let imgUrl = `<img src="${day.condition.icon_url}" />`;
      let maxTemp = Math.round(day.temperature.maximum);
      let minTemp = Math.round(day.temperature.minimum);
      dailyHTMLElement += `<div class="horizontal-forecast-daily">
            <div class="forecast-bundle-in-container">
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">${imgUrl}</div>
            <div class="forecast-temperatures">
              <span class="forecast-temp-value"><strong>${maxTemp}°</strong></span>
              <span class="forecast-temp-value">${minTemp}°</span>
            </div>
           </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast-weather-container");
  forecastElement.innerHTML = dailyHTMLElement;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let weatherCondition = document.querySelector("#current-weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let icon = document.querySelector(".current-temperature-icon");
  let city = response.data.city;
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  let imgURL = response.data.condition.icon_url;
  let imgDescription = response.data.condition.icon;
  icon.innerHTML = `<img src="${imgURL}" alt="${imgDescription}" />`;
  let cityDate = new Date(response.data.time * 1000);
  currentDateELement.innerHTML = formatDate(cityDate);

  //forecast
  let forecastApiKey = "f300cf6ad21c42dc4f0oefe03b237t4a";
  let forecastApiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}`;
  axios.get(forecastApiURL).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
// let currentDate = new Date();
// currentDateELement.innerHTML = formatDate(currentDate);
