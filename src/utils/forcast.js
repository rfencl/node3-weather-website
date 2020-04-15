const fetchURL = require('./fetchURL');

const urlbase =
  'https://api.darksky.net/forecast/6041f372b2b59b612b153f165888ff8c/';

const formatTime = (t) => {
  let h = t.getHours();
  let ampm = h > 12 ? 'PM' : 'AM';
  h = h > 12 ? h - 12 : h;
  let m = t.getMinutes();
  m = m < 10 ? '0' + m : m;
  return `${h}:${m} ${ampm}`;
};

const getDirection = (d) => {
  let directions = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  let i = 0;
  if (d > 337 || d < 23) {
    i = 7;
  } else if (d > 293 && d <= 337) {
    i = 6;
  } else if (d > 247 && d <= 293) {
    i = 5;
  } else if (d > 202 && d <= 247) {
    i = 4;
  } else if (d > 157 && d <= 202) {
    i = 3;
  } else if (d > 112 && d <= 157) {
    i = 2;
  } else if (d > 67 && d <= 112) {
    i = 1;
  }

  return directions[i];
};

const formatWeatherResponse = ({ code, error, currently, daily }) => {
  if (code) {
    return 'Error accessing WeatherReport  ' + error;
  }
  const currentWeatherData = currently;

  const highTime = formatTime(
    new Date(daily.data[0].temperatureHighTime * 1000)
  );
  const lowTime = formatTime(new Date(daily.data[0].temperatureLowTime * 1000));

  const bearing = getDirection(currently.windBearing);
  const speed = currently.windSpeed;

  return `${daily.data[0].summary} It is currently ${
    currentWeatherData.temperature
  } degrees out. There is ${
    currentWeatherData.precipProbability
  }% chance of rain.  Today's low will be ${Math.round(
    daily.data[0].temperatureLow
  )} degrees at ${lowTime} with a high of ${Math.round(
    daily.data[0].temperatureHigh
  )} degrees at ${highTime}. The wind is from the ${bearing} blowing at ${
    currently.windSpeed
  } miles/hour.`;
};

// returns a promise
const getWeatherInfo = ({ latitude, longitude }, callback) => {
  let url = urlbase + `${latitude},${longitude}`;
  return fetchURL(url, formatWeatherResponse).then((res) => callback(res));
};

module.exports = getWeatherInfo;
