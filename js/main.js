import {updateWeather, tempSwitch} from "./modules/weather.js"
import {updateRandomQuote} from "./modules/quote.js"
import {setRandomImageBackground} from "./modules/background.js";
import {toggleMilitaryTime, updateClock} from "./modules/clock.js";

updateClock()
setInterval(updateClock,1000)

updateRandomQuote()
updateWeather()
setRandomImageBackground()

const clockFormat = document.getElementById("clock-format")
clockFormat.addEventListener('change', toggleMilitaryTime)

const tempFormat = document.getElementById("temp-switch")
tempFormat.addEventListener('change', tempSwitch)

const imageRefresh = document.getElementById("image-refresh")
imageRefresh.addEventListener('click', setRandomImageBackground)

const quote = document.getElementById("quote")
quote.addEventListener('click', updateRandomQuote)
