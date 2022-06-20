let isCelsius = false

export function updateWeather() {
  fetchWeatherData().then(function(weather){
    document.getElementById("weather-description").innerText = weather.shortForecast
    const temp = isCelsius ? fahrenheitToCelsius(weather.temperature) : weather.temperature
    document.getElementById("current-temperature").innerHTML = temp + "&#176;"
    document.getElementById("weather-icon").src = weather.icon
  })
}

export function tempSwitch(e) {
  isCelsius = e.target.checked
  if(e.target.checked) {
    e.target.labels[0].innerText = "C"
  }
  else {
    e.target.labels[0].innerText = "F"
  }
  updateWeather()
}

function fetchWeatherData() {
  return fetch("https://api.weather.gov/gridpoints/BOI/120,84/forecast")
    .then(response => response.json())
    .then(data => data.properties.periods[0])
}

function celsiusToFahrenheit(c) {
  return Math.round((c * (9/5)) + 32)
}

function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * (5/9))
}


