/*
 Geolocation script
*/

var x = document.getElementById("location");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  document.getElementById("location").value = position.coords.latitude + ", "  + position.coords.longitude
  document.forms[0].submit()
}

/*
 URL parameters
*/

var param = new Vue({
  created()
  {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    window.value = params.get("location");
  },
});

/*
 Query
*/

var input_location = window.value || "Austin, TX"

var input = {"location": input_location};
Algorithmia.client("simTS7wndR7Mfcm5OGkylKw5JFt1")
  .algo("koverholt/weather_dashboard/0.1.0?timeout=300")
  .pipe(input)
  .then(function(output) {
    var obj = output.result;
    var current_temperature = obj["current_temperature"];
    var current_apparent_temperature = obj["current_apparent_temperature"];
    var current_humidity = obj["current_humidity"];
    var current_wind_speed = obj["current_wind_speed"];

    var app = new Vue({
      el: '#app',
      data: {
        current_temperature: current_temperature,
        current_apparent_temperature: current_apparent_temperature,
        current_humidity: current_humidity,
        current_wind_speed: current_wind_speed,
      }
    })
});
