

let apiKey = CONFIG.API_KEY;


let city = document.querySelector(".weather_city");
// city.textContent='vaishali,Bihar'

let weather_date_time = document.querySelector(".weather_date_time");
let weather_forecast = document.querySelector(".weather_forecast");
let weather_icon = document.querySelector(".weather_icon");
let weather_temperature = document.querySelector(".weather_temperature");
let weather_min = document.querySelector(".weather_min");
let weather_max = document.querySelector(".weather_max");
let weather_feels = document.querySelector(".weather_feelsLike");
let weather_Humidity = document.querySelector(".weather_Humidity");
let weather_Wind = document.querySelector(".weather_Wind");
let weather_Pressure = document.querySelector(".weather_Pressure");


let getTimeDate = () => {
	let curdate = new Date() // convert second to millisecond
	let options = {
		weekday: "long",
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	let formatted = new Intl.DateTimeFormat('en-US', options);
	//console.log(formatted);
	return formatted.format(curdate);
}

let getcountrycode = (code) => {
	return new Intl.DisplayNames([code], { type: 'region' }).of(code);

}


let city_name = 'vaishali';

let citySearch = document.querySelector(".weather_search");
citySearch.addEventListener('submit', (e) => {
	e.preventDefault();
	let cityNameSearch = document.querySelector(".city_name");
	console.log(cityNameSearch.value);
	city_name = cityNameSearch.value.toLowerCase();
	getWeatherData();
	cityNameSearch.value = '';
});

let getWeatherData = async () => {
	let weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&APPID=${apiKey}`;

	try {
		let res = await fetch(weatherurl);
		let data = await res.json();
		if (data.cod !== 200) {
			alert("City not found!");
			return;
		}

		let { main, name, weather, wind, sys, dt } = data;

		city.innerHTML = `${name}, ${getcountrycode(sys.country)}`;
		weather_date_time.innerHTML = getTimeDate();
		weather_forecast.innerHTML = `${weather[0].main}`;

		weather_temperature.innerHTML = `${main.temp}&#176`;
		weather_max.innerHTML = `max: ${main.temp_max.toFixed()}&#176`;
		weather_min.innerHTML = `min: ${main.temp_min.toFixed()}&#176`;
		weather_feels.innerHTML = `${main.feels_like.toFixed()}&#176`;
		weather_Humidity.innerHTML = `${main.humidity.toFixed()}%`;
		weather_Pressure.innerHTML = `${main.pressure} hPa`;
		weather_Wind.innerHTML = `${wind.speed} m/s`;

		weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;

	} catch (error) {
		console.error(error);
	}
};


window.addEventListener('load', getWeatherData);

