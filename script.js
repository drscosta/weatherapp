let apiKey = config.myKey;

let weather = {
    //OpenWeatherMap API - https://openweathermap.org/
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        //selectors for any dinamic field on the page
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png"; //@2x.png to duplicate icon size if needed
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "º C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " km/h";
        //document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
    },
    searchCity: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-button").addEventListener("click", function () {
    weather.searchCity();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        weather.searchCity();
    }
});
