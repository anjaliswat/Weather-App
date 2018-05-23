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

window.onload = function () {
  temp = document.getElementById("temperature");
  icon = document.getElementById("icon");
  geocoder = new google.maps.Geocoder();
  var input = document.getElementById("address");
  input.addEventListener('keyup', function(event){
    if (event.keyCode=== 13) {
      codeAddress();
    }
  });
}

function getData(weather_url) {
  fetch(proxyurl + weather_url,  {mode: 'cors'})
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
    var weather = {};
    weather.temp = Math.round(data.currently.temperature);
    renderTemperature(weather);
    var date = new Date();
    var day = date.getDay();
    id = 0;
    iconid = 10;
    highid = 100;
    lowid = 1000;
    for(i = day+1; i <= 7; i++) {
      renderDay(i, id)
      id += 1;
      dailyicon = (data.daily.data[i].icon);
      dailyHigh = Math.round(data.daily.data[i].apparentTemperatureHigh);
      dailyLow = Math.round(data.daily.data[i].apparentTemperatureLow);
      renderHighLow(dailyHigh, highid);
      renderHighLow(dailyLow, lowid);
      highid +=1
      lowid +=1
      renderIcon(dailyicon, iconid);
      iconid +=1
    }

    for(i = 1; i < day; i++) {
      renderDay(i, id)
      id += 1;
      dailyicon = (data.daily.data[i].icon);
      dailyHigh = Math.round(data.daily.data[i].apparentTemperatureHigh);
      dailyLow = Math.round(data.daily.data[i].apparentTemperatureLow);
      renderHighLow(dailyHigh, highid);
      renderHighLow(dailyLow, lowid);
      highid +=1
      lowid +=1
      renderIcon(dailyicon, iconid);
      iconid += 1
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function renderTemperature(weather) {
  temp.innerHTML = weather.temp;
}

function renderIcon(icon, id) {
  console.log(icon);
  console.log(id);
  switch (icon) {
    case 'clear-day':
      document.getElementById(id).className = 'fas fa-sun';
      document.getElementById(id).style.color = '#FF8C00';
      break;
    case 'clear-night':
      document.getElementById(id).className = 'far fa-moon';
      document.getElementById(id).style.color = '#00008B';
      break;
    case 'rain':
      document.getElementById(id).className = 'fas fa-tint';
      document.getElementById(id).style.color = '#6495ED';
      break;
    case 'snow':
      document.getElementById(id).className = 'fas fa-snowflake';
      document.getElementById(id).style.color = '#696969';
      break;
  //  case 'sleet':
    //  icon.class = './images/sun.png';
      //break;
    //case 'wind':
    //  icon.class = './images/sun.png';
      //break;
    //case 'fog':
      //icon.class = './images/sun.png';
      //break;
    case 'cloudy':
      document.getElementById(id).className = 'far fa-cloud';
      document.getElementById(id).style.color = '#00BFFF';
      break;
    case 'partly-cloudy-day':
      document.getElementById(id).className = 'fab fa-cloudversify';
      document.getElementById(id).style.color = '#00BFFF';
      break;
    case 'partly-cloudy-night':
      document.getElementById(id).className = 'fab fa-cloudversify';
      document.getElementById(id).style.color = '#00BFFF';
      break;
  }
}

function renderHighLow(temp, id) {
    document.getElementById(id).innerHTML = temp;
}

function renderDay(day, id) {
  switch (day) {
    case 1:
      document.getElementById(id).innerHTML = 'Monday';
      break;
    case 2:
      document.getElementById(id).innerHTML = 'Tuesday';
      break;
    case 3:
      document.getElementById(id).innerHTML = 'Wednesday';
      break;
    case 4:
      document.getElementById(id).innerHTML = 'Thursday';
      break;
    case 5:
      document.getElementById(id).innerHTML = 'Friday';
      break;
    case 6:
      document.getElementById(id).innerHTML = 'Saturday';
      break;
    case 7:
      document.getElementById(id).innerHTML = 'Sunday';
      break;
  }
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
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    weather_url =  `https://api.darksky.net/forecast/dd57abdb366484f0f89f1fa91e9fb3ed/${latitude},${longitude}`
    getData(weather_url)
  });
}

function getGeolocation() {
  fetch(proxyurl + location_url,  {mode: 'cors'})
  .then((resp) => resp.json())
}
