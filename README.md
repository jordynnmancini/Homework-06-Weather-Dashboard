# Homework-06-Weather-Dashboard

## My Task 
The goal was to build a weather dashboard tht allows the user to search for a city in order to see the current weather, as well as a 5 day forecast. The user's search history is saved & rendered on the screen, and it's possible to click on a city to view it's weather information again. 

## The Process
I used dynamically updated HTML & CSS, including the use of Bootstrap. I also used Javascript along with Moment.JS, few elements of JQuery, and the OpenWeather API. I called three different API's from OpenWeather - one for the current day weather data, one for the five-day forecast, and one for the UV Index.

When the user searches for a city by name, they are presented with the current weather in that city & a five-day forecast. Each time they search for a city, the city name is rendered under the search bar. These names function like buttons and are clickable to bring up that city's data again. 

I faced trouble with getting the color of the UV index to update based on the number. There is a bug in the code that I can't figure out where it doesn't recognize the class that I am trying to add (JS lines 84-94). 

## Link to Depoloyed Application 
https://jordynnmancini.github.io/Homework-06-Weather-Dashboard/ 

## Demonstration
This screen recording was taken at night. 

![demonstration](./assets/images/demonstration.gif)