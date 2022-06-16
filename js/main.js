let totalQuotes = 100
let isMilitary = false

setInterval(updateClock,1000)

updateRandomQuote()
updateWeather()
setRandomImageBackground()

const clockFormat = document.getElementById("clock-format")

clockFormat.addEventListener('change', toggleMilitaryTime)

function toggleMilitaryTime(e) {
  isMilitary = e.target.checked
  if(e.target.checked) {
    e.target.labels[0].innerText = "24"
  }
  else {
    e.target.labels[0].innerText = "12"
  }
  updateClock()
}

function updateClock()
{
  const time = new Date()
  updateTime(time)
  updateClockMessage(time)
}

function updateTime(time){
  const timeString = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    //second: "2-digit",
    hour12: !isMilitary
  })
  document.getElementById("time").innerText = timeString
}

function updateClockMessage(time) {
  const hour = time.getHours()
  let message = "Good day!"
  if(hour < 7 || hour >= 21){
    message = "Have a good night!🌙"
  }
  else if(hour >= 7 && hour < 12) {
    message = "Have a good morning!🌇"
  }
  else if(hour >= 12 && hour < 17){
    message = "Have a good afternoon!🌞"
  }
  else if(hour >= 17 && hour < 21){
    message = "Have a good evening!🌆"
  }

  document.getElementById("clock-greeting").innerText = message
}

function setRandomImageBackground() {
  fetchRandomImageUrl().then(url => document.body.style.backgroundImage = 'url(' + url + ')')
}

function fetchRandomImageUrl() {
  return fetch('https://source.unsplash.com/random')
    .then(response => response.url);
}



function fetchRandomQuote() {
  let req = fetch('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1&offset=' + Math.floor(Math.random() * totalQuotes))
  req.then(res => totalQuotes = res.headers.get("x-wp-total"))
  return req.then(response => response.json())
    .then(function(data) {
      return {
        author: data[0].title.rendered,
        content: data[0].content.rendered
      }
    })
}

function updateRandomQuote() {
  fetchRandomQuote().then(function(quote) {
    document.getElementById("quote-text").innerHTML = removeTags(quote.content)
    document.getElementById("quote-author").innerText = quote.author
  })
}

//helper function to remove <p> tags that come with quotes
function removeTags(s)
{
  let div = document.createElement("div")
  div.innerHTML = s
  let text = div.textContent || div.innerText || ""
  return text
}

function fetchWeatherData() {
  return fetch("https://api.weather.gov/gridpoints/BOI/120,84/forecast")
    .then(response => response.json())
    .then(data => data.properties.periods[0])
}

function updateWeather() {
  fetchWeatherData().then(function(weather){
    document.getElementById("weather-description").innerText = weather.detailedForecast
    document.getElementById("current-temperature").innerHTML = weather.temperature + "&#176;"
    document.getElementById("weather-icon").src = weather.icon
  })
}

function celsiusToFahrenheit(c) {
  return Math.round((c * (9/5)) + 32)
}

function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * (5/9))
}
