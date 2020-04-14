const fetchURL = require('./fetchURL');

const url =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmZlbmNsIiwiYSI6ImNrOGY4OHdicDAxbWQzZHJxeHJkam1yN3AifQ.Se4JNkN_hk_RDp9pWN3InA&limit=1';

const coords = {
  latitude: '',
  longitude: '',
  location: '',
};

const formatLocationResponse = ({ message, features }) => {
  if (message) {
    return `Error accessing Location: ${message} `;
  }
  if (!features || features.length === 0) {
    return 'Location not found';
  }

  const locationData = features[0];
  coords.latitude = locationData.center[1];
  coords.longitude = locationData.center[0];
  coords.location = locationData.place_name;
  return `${coords.location} is located at:\nLatitude: ${coords.latitude}\tLongitude: ${coords.longitude}`;
};

const geocode = (address, callback) => {
  const locationURL = url.replace('${address}', encodeURIComponent(address));
  return fetchURL(locationURL, formatLocationResponse)
    .then((res) => callback(res))
    .catch((error) => callback(error));
};

module.exports = { geocode, coords };
