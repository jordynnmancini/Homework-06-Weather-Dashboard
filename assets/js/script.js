// declare variables
const cityFormEl = document.querySelector("#city-form"); 
const searchInputEl = document.querySelector("#city-input"); 
const searchButton = document.querySelector("#search-btn");
const contentContainerEl = document.querySelector("#content-container"); 
const summmaryEl = document.querySelector("#summary"); 
const fiveDayContainerEl = document.querySelector("#card-container"); 
const forecastCardEl = document.querySelectorAll(".card-body"); 

const APIKey = "0bb86b23bacf5b03d424dc37a26e462b"; 

let currentDay = moment().format('L'); 

const searchHistoryEl = document.querySelector("#search-history"); 
let cityHistory = JSON.parse(localStorage.getItem("city-history")) || [];   


// get weather in city that the user entered 
let formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = searchInputEl.value.trim(); 

    if (cityName) {
        displayCurrentDay(cityName); 
        displayForecast(cityName); 
        storeHistory(event); 

        contentContainerEl.classList.remove("hidden"); 

        searchInputEl.value = ''; 
        
    } else {
        alert('Please enter a city name'); 
    }
}; 

const displayCurrentDay = function (cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            // render data on screen for current day
            var nameAndDate = data.name + " " + currentDay 
            var cityTitle = document.getElementById("city-name").textContent = nameAndDate; 

            var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var weatherIcon = document.getElementById("current-icon").src = iconurl;

            var cityTemp = document.getElementById("temp").textContent = "Temperature:" + " " + data.main.temp + " °F"; 
            var cityHumidity = document.getElementById("humidity").textContent = "Humidity:" + " " + data.main.humidity + "%";
            var cityWindSpeed = document.getElementById("wind-speed").textContent = "Wind Speed:" + " " + data.wind.speed + " MPH"; 

            let lat = data.coord.lat;
            let lon = data.coord.lon;
            getUVindex(lat,lon); 

          });
        } else {
          alert('Error');
        }
      })
      .catch(function (error) {
        alert('Unable to locate city');
      });
  };

  const getUVindex = function (lat, lon) {
    var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`

    fetch(uvUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            // render UV Index data
            var UVI = document.getElementById("UV-index").textContent = data.current.uvi; 

            const uviSpan = document.querySelector("UV-index"); 

            if (UVI > 2 && UVI < 6) {
              uviSpan.classList.remove("green"); 
              uviSpan.classList.add("yellow");
            }
            else if (UVI > 5 && UVI < 8) {
              uviSpan.classList.remove("green"); 
              uviSpan.classList.add("orange"); 
            }
            else if (UVI > 8) {
              uviSpan.classList.remove("green"); 
              uviSpan.classList.add("red"); 
            };
           
          });
        } else {
          alert('Error');
        }
      })
      .catch(function (error) {
        alert('Unable to locate city');
      });

  }

const displayForecast = function (cityName) {
    var apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`

    fetch(apiForecastUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            // render data on screen for 5 day forecast 
            const dayOne = document.querySelector("#day-1").textContent = moment().add(1,'days').format('L');
            const dayTwo = document.querySelector("#day-2").textContent = moment().add(2,'days').format('L');
            const dayThree = document.querySelector("#day-3").textContent = moment().add(3,'days').format('L');
            const dayFour = document.querySelector("#day-4").textContent = moment().add(4,'days').format('L');
            const dayFive = document.querySelector("#day-5").textContent = moment().add(5, 'days').format('L');

            let dayOneIcon = document.getElementById("day-1-icon").src = "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png";
            let dayTwoIcon = document.getElementById("day-2-icon").src = "http://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png";
            let dayThreeIcon = document.getElementById("day-3-icon").src = "http://openweathermap.org/img/w/" + data.list[20].weather[0].icon + ".png";
            let dayFourIcon = document.getElementById("day-4-icon").src = "http://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png";
            let dayFiveIcon = document.getElementById("day-5-icon").src = "http://openweathermap.org/img/w/" + data.list[36].weather[0].icon + ".png";



            let dayOneTemp = document.getElementById("day-1-temp").textContent = "Temperature:" + " " + data.list[4].main.temp + " °F"; 
            let dayTwoTemp = document.getElementById("day-2-temp").textContent = "Temperature:" + " " + data.list[12].main.temp + " °F"; 
            let dayThreeTemp = document.getElementById("day-3-temp").textContent = "Temperature:" + " " + data.list[20].main.temp + " °F"; 
            let dayFourTemp = document.getElementById("day-4-temp").textContent = "Temperature:" + " " + data.list[28].main.temp + " °F"; 
            let dayFiveTemp = document.getElementById("day-5-temp").textContent = "Temperature:" + " " + data.list[36].main.temp + " °F"; 

            let dayOneHumidity = document.getElementById("day-1-humid").textContent = "Humidity:" + " " + data.list[4].main.humidity + "%";
            let dayTwoHumidity = document.getElementById("day-2-humid").textContent = "Humidity:" + " " + data.list[12].main.humidity + "%";
            let dayThreeHumidity = document.getElementById("day-3-humid").textContent = "Humidity:" + " " + data.list[20].main.humidity + "%";
            let dayFourHumidity = document.getElementById("day-4-humid").textContent = "Humidity:" + " " + data.list[28].main.humidity + "%";
            let dayFiveHumidity = document.getElementById("day-5-humid").textContent = "Humidity:" + " " + data.list[36].main.humidity + "%";



          });
        } else {
          alert('Error');
        }
      })
      .catch(function (error) {
        alert('Unable to locate city');
      });
   
}; 



//store past searches in Local Storage & show on screen (needs fixing/editing)
let storeHistory = function(event) {
    event.preventDefault(); 
    var city = searchInputEl.value.trim();
    li = document.createElement("li"); 
    li.textContent = city; 
    li.classList.add("past-searches"); 
    searchHistoryEl.appendChild(li); 
    searchInputEl.value = ""; 
    cityHistory.push(city);

    localStorage.setItem('city-history', JSON.stringify(cityHistory));
};  

// make past searches clickable
let cityButtons = function(event) {
    let cityButton = event.target.textContent; 
    console.log(cityButton); 

    displayCurrentDay(cityButton); 
    displayForecast(cityButton);
}


cityFormEl.addEventListener('submit', formSubmitHandler);
searchHistoryEl.addEventListener('click', cityButtons); 