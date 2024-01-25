// Elements prepairing
const input = document.querySelector("input");
const button = document.querySelector("button");

const cityName = document.querySelector(".weather__one_city h1");
const weather = document.querySelector(".weather__one_city h2");

const photo = document.querySelector(".weather__one_icon i");
const temperature = document.querySelector(".weather__one_temperature");
const wind = document.querySelector(".weather__two_features--wind p");
const humidity = document.querySelector(".weather__two_features--humidity p");

let url;
let city;
let statusWeather = weather.textContent;

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=4738ea4f96e4b93ab0f5eb3cbbafe0f5";
const units = "&units=metric";
const warning =document.querySelector(".warning")

const getData = () => {
    city = (!input.value) ? "Warsaw" : input.value;
    url = apiLink + city + apiKey + units;
    photo.style.animation = "";
    warning.textContent = "";

    axios.get(url)
        .then(response => {
            const status =  Object.assign({}, ...response.data.weather);
            cityName.textContent = response.data.name;
            temperature.textContent = Math.floor(response.data.main.temp) + "°C";
            wind.textContent = response.data.wind.speed + "m/s";
            humidity.textContent = response.data.main.humidity + "%";
            input.value = '';
            photo.style.animation = "fadeInAnimation ease 2s";

            if (status.id>=200 && status.id<=232) {
                statusWeather = "stormy";
                photo.classList.add("qi-1043");
            } else if (status.id>=300 && status.id<=321) {
                statusWeather = "Drizzle";
                photo.classList.add("qi-305-fill");
            }  else if (status.id>=500 && status.id<=531) {
                statusWeather = "Rain";
                photo.classList.add("qi-307-fill");
            } else if (status.id>=600 && status.id<=622) {
                statusWeather = "Snow";
                photo.classList.add("qi-499");
            } else if (status.id>=801 && status.id<=804) {
                statusWeather = "Clouds";
                photo.classList.add("qi-104-fill");
            } else if (status.id === 800) {
                statusWeather = "Clear";
                photo.classList.add("qi-100-fill");
            } else if (status.id === 741) {
                statusWeather = "Fog";
                photo.classList.add("qi-2100-fill");
            } else {
                statusWeather = "different";
                photo.classList.add("qi-1218");
            }

        })
        .catch(() => {
            photo.classList.add("qi-1218");
            warning.textContent = "Please enter the correct city name."
        })
}

const enterCheck = () => {
    if (event.keyCode === 13) {
        getData();
    }
}


window.addEventListener('load', function() {
    getData();
})
button.addEventListener("click", getData);
input.addEventListener("keyup", enterCheck)
