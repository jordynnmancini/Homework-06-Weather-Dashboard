const cityFormEl = document.querySelector("#city-form"); 
const searchInputEl = document.querySelector("#city-input"); 
const searchButton = document.querySelector("#search-btn");
const contentContainerEl = document.querySelector("#content-container"); 
const summmaryEl = document.querySelector("#summary"); 
const fiveDayContainerEl = document.querySelector("#card-container"); 
const forecastCardEl = document.querySelector(".card-body"); 

const APIKey = "0bb86b23bacf5b03d424dc37a26e462b"; 

const searchHistoryEl = document.querySelector("#search-history"); 
let cityHistory = JSON.parse(localStorage.getItem("city-history")) || [];   


//store past searches in Local Storage & show on screen (needs fixing/editing)
// searchButton.addEventListener("click", function(event) {
//     event.preventDefault(); 
//     var city = searchInputEl.value.trim();
//     li = document.createElement("li"); 
//     li.textContent = city; 
//     li.classList.add("past-searches"); 
//     searchHistoryEl.appendChild(li); 
//     searchInputEl.value = ""; 
//     cityHistory.push(city);

//     localStorage.setItem('city-history', JSON.stringify(cityHistory));
// });  



// get weather in city that the user entered 
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = searchInputEl.value.trim(); 

    if (cityName) {
        displayCurrentDay(cityName); 
        displayForecast(cityName); 

        summmaryEl.textContent = ''; 
        forecastCardEl.textContent = ''; 
        searnInputEl.value = ''; 
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
            // display data
            var nameAndDate = data.name + " " + "(03/03/21)" 
            var cityTitle = document.getElementById("city-name").textContent = nameAndDate; 

            var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var weatherIcon = document.getElementById("current-icon").src = iconurl;

            var cityTemp = document.getElementById("temp").textContent = "Temperature:" + " " + data.main.temp + " °F"; 
            var cityHumidity = document.getElementById("humidity").textContent = "Humidity:" + " " + data.main.humidity + "%";
            var cityWindSpeed = document.getElementById("wind-speed").textContent = "Wind Speed:" + " " + data.wind.speed + " MPH"; 
          });
        } else {
          alert('Error');
        }
      })
      .catch(function (error) {
        alert('Unable to locate city');
      });

  };

const displayForecast = function (cityName) {
    var apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`

    fetch(apiForecastUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            // display data
             

            
          });
        } else {
          alert('Error');
        }
      })
      .catch(function (error) {
        alert('Unable to locate city');
      });
   
}; 


displayCurrentDay("Austin"); 
displayForecast("Austin"); 