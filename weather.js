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
      unhide('hidden');
      codeAddress();
    }
  });
}

function unhide(divID) {
var item = document.getElementById(divID);
if (item) {
    if(item.className=='hidden'){
        item.className = 'container' ;
    }
}}

function getData(weather_url) {
  fetch(proxyurl + weather_url,  {mode: 'cors'})
  .then((resp) => resp.json())
  .then(function(data) {
    var weather = {};
    console.log(data)
    weather.temp = Math.round(data.currently.temperature);
    renderTemperature(weather);
    var date = new Date();
    var day = date.getDay();
    id = 0;
    iconid = 0;
    highid = 0;
    lowid = 0;
    hourlyid = 0;
    for(i = day+1; i <= 7; i++) {
      renderDay(i, id)
      id += 1;
      dailyicon = (data.daily.data[i].icon);
      dailyHigh = Math.round(data.daily.data[i].apparentTemperatureHigh);
      dailyLow = Math.round(data.daily.data[i].apparentTemperatureLow);
      renderHighLow(dailyHigh, 'high' + highid, 'high');
      renderHighLow(dailyLow, 'low' + lowid, 'low');
      highid +=1
      lowid +=1
      renderIcon(dailyicon, 'icon' + iconid);
      iconid +=1
    }

    for(i = 1; i < day; i++) {
      renderDay(i, id)
      id += 1;
      dailyicon = (data.daily.data[i].icon);
      dailyHigh = Math.round(data.daily.data[i].apparentTemperatureHigh);
      dailyLow = Math.round(data.daily.data[i].apparentTemperatureLow);
      renderHighLow(dailyHigh, 'high' + highid, 'high');
      renderHighLow(dailyLow, 'low' + lowid, 'low');
      highid +=1
      lowid +=1
      renderIcon(dailyicon, 'icon' + iconid);
      iconid += 1
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function renderTemperature(weather) {
  temp.innerHTML = weather.temp;
  document.getElementById('degree').innerHTML = ('\xB0');
}

function renderIcon(icon, id) {
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

function renderHighLow(temp, id, highlow) {
  if(highlow == 'high') {
    document.getElementById(id).innerHTML = 'Hi : ' + temp;
  }
  else {
    document.getElementById(id).innerHTML = 'Lo : ' + temp;
  }
}

function renderDay(day, id) {
  switch (day) {
    case 1:
      document.getElementById(id).innerHTML = 'Mon';
      break;
    case 2:
      document.getElementById(id).innerHTML = 'Tue';
      break;
    case 3:
      document.getElementById(id).innerHTML = 'Wed';
      break;
    case 4:
      document.getElementById(id).innerHTML = 'Thu';
      break;
    case 5:
      document.getElementById(id).innerHTML = 'Fri';
      break;
    case 6:
      document.getElementById(id).innerHTML = 'Sat';
      break;
    case 7:
      document.getElementById(id).innerHTML = 'Sun';
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

function toggleUnit(unit) {
  if(unit == 'celsius') {
    weather_url = `https://api.darksky.net/forecast/dd57abdb366484f0f89f1fa91e9fb3ed/${latitude},${longitude}?units=si`
    getData(weather_url)
  }
  if(unit == 'fahrenheit') {
    weather_url =  `https://api.darksky.net/forecast/dd57abdb366484f0f89f1fa91e9fb3ed/${latitude},${longitude}?units=us`
    getData(weather_url)
  }
}
