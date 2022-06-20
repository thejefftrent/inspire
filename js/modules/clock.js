let isMilitary = false

export function toggleMilitaryTime(e) {
  isMilitary = e.target.checked
  if(e.target.checked) {
    e.target.labels[0].innerText = "24"
  }
  else {
    e.target.labels[0].innerText = "12"
  }
  updateClock()
}

export function updateClock()
{
  const time = new Date()
  updateTime(time)
  updateClockMessage(time)
}

function updateTime(time){
  document.getElementById("time").innerText = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    //second: "2-digit",
    hour12: !isMilitary
  })
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
