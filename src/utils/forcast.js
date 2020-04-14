const fetchURL = require('./fetchURL');

const urlbase =
  'https://api.darksky.net/forecast/6041f372b2b59b612b153f165888ff8c/';

const formatWeatherResponse = ({ code, error, currently, daily }) => {
  if (code) {
    return 'Error accessing WeatherReport  ' + error;
  }
  const currentWeatherData = currently;
  return `${daily.data[0].summary} It is currently ${currentWeatherData.temperature} degrees out. There is ${currentWeatherData.precipProbability}% chance of rain.`;
};

// returns a promise
const getWeatherInfo = ({ latitude, longitude }, callback) => {
  let url = urlbase + `${latitude},${longitude}`;
  return fetchURL(url, formatWeatherResponse).then((res) => callback(res));
};

module.exports = getWeatherInfo;
