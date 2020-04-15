// async - await syntax vs promise - then
const fetchURL = async (url, responseHandler) => {
  const response = await (await fetch(url)).json();
  return responseHandler(response);
};

// fetchURL('http://localhost:3000/weather?address=11421%20NW%2034th%20Ct%20Vancouver,%20WA',
//   (data) => {
//     console.log(data);
//     h2.textContent = `Today's Weather Forecast for ${data.location} is ${data.forecast}`;
//   }
// );

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     h2.textContent=`{${Object.keys(data)[0]}: ${data.puzzle}}`;
//   });
// });
const forecast_location = document.getElementById('location-data');
const forecast = document.getElementById('forecast-data');
const weatherForm = document.querySelector('form');
const address = document.getElementById('address');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  forecast_location.textContent = 'Loading Forecast ....';
  forecast.textContent = '';
  fetchURL('/weather?address=/' + address.value, (data) => {
    forecast_location.textContent = `Today's Weather Forecast for ${data.location}`;
    forecast.textContent = `${data.forecast}`;
  });
});
