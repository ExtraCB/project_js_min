const timeEl = document.getElementById("timeEl");
const timezoneInput = document.getElementById("timeZoneInput");
const moonEl = document.getElementById("moon");
const sunEl = document.getElementById("sun");



function getCurrentTime() {
  const selectedTime = timezoneInput.value;

  timeEl.innerHTML = ToTimeZone(selectedTime);

  const h = moment().tz(selectedTime).hours().toString().padStart(2, "0");
  if (h < 7 || h > 19) {
    document.body.style.background = "black";
    timeEl.style.color = "white";
    fadeInMoon();
    fadeOutSun();
  } else {
    document.body.style.background = "white";
    timeEl.style.color = "black";
    fadeOutMoon();
    fadeInSun();
  }
}

function ToTimeZone(zone) {
  var format = "YYYY-MM-DD HH:mm:ss";
  return moment().tz(zone).format(format);
}

function populateTimezones() {
  const timezones = moment.tz.names();

  timezones.forEach((timezone) => {
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = timezone;
    timezoneInput.appendChild(option);
  });
}

function fadeInMoon() {
    moonEl.style.opacity = 1;
    moonEl.style.transition = "opacity 2s ease-in-out";
  }
  
  function fadeOutMoon() {
    moonEl.style.opacity = 0;
    moonEl.style.transition = "opacity 1s ease-in-out";
  }


  function fadeInSun() {
    sunEl.style.opacity = 1;
    sunEl.style.transition = "opacity 2s ease-in-out";
  }
  
  function fadeOutSun() {
    sunEl.style.opacity = 0;
    sunEl.style.transition = "opacity 1s ease-in-out";
  }
  

populateTimezones();
timezoneInput.addEventListener("change", getCurrentTime);
setInterval(getCurrentTime, 1000);
