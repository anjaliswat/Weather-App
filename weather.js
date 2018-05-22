var apikey = "dd57abdb366484f0f89f1fa91e9fb3ed"
const proxyurl = "https://cors-anywhere.herokuapp.com/"
location_url = 'http://maps.googleapis.com/maps/AIzaSyBanVAHxTf1a7yYfwnXBOXO3LMxbeXhh5k/geocode/outputFormat?parameters'
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var geocoder;
var map;

function getData(weather_url) {
  fetch(proxyurl + weather_url,  {mode: 'cors'})
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data)
    let content = data.results;
    var weather = {};
    weather.wind = data.currently.windSpeed;
    weather.direction = "N";
    weather.humidity = 35;
    weather.loc = data.timezone;
    weather.latitude = "40.4773991"
    weather.longitude = "-74.25908989999999"
    weather.icon = 200;
    weather.temp = data.currently.temperature;
    console.log(data)
    update(weather);
    })
  .catch(function(error) {
    console.log(error);
  });
}

function getGeolocation() {
  fetch(proxyurl + location_url,  {mode: 'cors'})
  .then((resp) => resp.json())
}

function update(weather) {
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  //icon.src = "imgs/code/" + weather.icon + ".png";
}

window.onload = function () {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  //icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}



function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    latitude = 0;
    longitude = 0;
    if (status == 'OK') {
          position = results[0]
          latitude = (results[0].geometry.bounds.f.b + results[0].geometry.bounds.f.f)/2
          longitude = (results[0].geometry.bounds.b.b + results[0].geometry.bounds.b.f)/2
          console.log(position)
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    weather_url =  `https://api.darksky.net/forecast/dd57abdb366484f0f89f1fa91e9fb3ed/${latitude},${longitude}`
    console.log(weather_url)
    getData(weather_url)
  });
}
