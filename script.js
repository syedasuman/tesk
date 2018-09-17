let weatherIcons = [
    {
        codes: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
        iconDay: "wi-thunderstorm",
        iconNight: "wi-thunderstorm"
    },
    {
        codes: [300, 301, 302, 310, 311, 312, 313, 314, 321],
        iconDay: "wi-showers",
        iconNight: "wi-showers"
    },
    {
        codes: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
        iconDay: "wi-rain",
        iconNight: "wi-rain"
    },
    {
        codes: [600, 601, 602, 611, 612, 615, 616, 620, 621, 622],
        iconDay: "wi-snow",
        iconNight: "wi-snow"
    },
    {
        codes: [701, 711, 721, 731, 741, 751, 761],
        iconDay: "wi-day-fog",
        iconNight: "wi-night-fog"
    },
    {
        codes: [762],
        iconDay: "wi-volcano",
        iconNight: "wi-volcano"
    },
    {
        codes: [771],
        iconDay: "wi-strong-wind",
        iconNight: "wi-strong-wind"
    },
    {
        codes: [781],
        iconDay: "wi-tornado",
        iconNight: "wi-tornado"
    },
    {
        codes: [800],
        iconDay: "wi-day-sunny",
        iconNight: "wi-night-clear"
    },
    {
        codes: [801],
        iconDay: "wi-day-cloudy",
        iconNight: "wi-night-alt-cloudy"
    },
    {
        codes: [802, 803, 804],
        iconDay: "wi-cloudy",
        iconNight: "wi-cloudy"
    }


];
let lastClass;
function updateWeather() {
    let city = document.querySelector("input").value;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee79a981af6eda48c391deddd8b947cc&units=metric`,
        success: function (data) {
            const bodyEl = document.querySelector("body");
            const weatherDisplayEl = document.querySelector(".main");
            const cityNameEl = document.querySelector(".city-name");
            const temperatureEl = document.querySelector(".temperature > .val");
            const descriptionEl = document.querySelector(".description");
            const minTempEl = document.querySelector(".minmax > .min");
            const maxTempEl = document.querySelector(".minmax > .max");
            const weatherIconEl = document.querySelector("i.wi");
            let weatherIcon;
            for (let i = 0; i < weatherIcons.length; i++) {
                for (let j = 0; j < weatherIcons[i].length; j++) {
                    if (data.weather[0].ids === weatherIcons[i].code[j]) {
                        weatherIcon = weatherIcons[i];
                        break;
                    }
                }
            }
            weatherIconEl.classList.remove(lastClass);
            if (data.dt > data.sys.sunset || data.dt < data.sys.sunrise) {
                bodyEl.classList.remove("light");
                bodyEl.classList.add("dark");
                weatherIconEl.classList.add(weatherIcons.iconNight);
                lastClass = weatherIcons.iconNight;
                isDay = false;
            } else {
                bodyEl.classList.remove("dark");
                bodyEl.classList.add("light");
                isDay = true;
                weatherIconEl.classList.add(weatherIcons.iconDay);
                lastClass = weatherIcons.iconDay;
            }


            cityNameEl.innerHTML = city;
            temperatureEl.innerHTML = Math.round(data.main.temp);
            descriptionEl.innerHTML = data.weather[0].main;
            minTempEl.innerHTML = Math.round(data.main.temp_min);
            maxTempEl.innerHTML = Math.round(data.main.temp_max);
            weatherDisplayEl.style.display = "flex";
        },
        error: function (err) {
            alert(err.responseJson.message);
        }
    });
    return false;
}
