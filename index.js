'use strict'

const apiKey = "361c741c4fbd9521202a31ebc59895ff";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        var data = await response.json();



        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

        console.log(data);

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloudy.svg";
        } else if (data.weather[0].main == "clear") {
            weatherIcon.src = "images/clear-day.svg";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.svg";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.svg";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.svg";
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector('.error').style.display = "none";
    }

}

searchBox.addEventListener("keyup", function (e) {

    e.preventDefault();
    if (e.keyCode === 13) {
        searchBtn.click();
    }

});

searchBtn.addEventListener('click', () => {

    checkWeather(searchBox.value);
})
