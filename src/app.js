const path = require('path');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const getWeatherInfo = require('./utils/forcast');
const { geocode, coords } = require('./utils/geocode');
const { callbackify } = require('util');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
let formattedLocation;
const setLocation = (loc) => formattedLocation = loc;
const run = (location, callback) => {
  geocode(location, (res) => setLocation(res))    // save the formatted response   
    .then(() => {
      getWeatherInfo(coords, (res) => res) 
      .then((res) => callback(res))
      .catch((error) => callback(error))
    })
    .catch((error) => callback(error));
};

// Template Engine config
app.set('view engine', 'hbs'); // use handlebars template engine
app.set('views', viewsPath); // set the path to the views directory
hbs.registerPartials(partialsPath);  // partials path
app.use(express.static(publicDirectoryPath));

// routes
app.get('', (req, res) => {
  // default (index) route
  res.render('index', {
    title: 'Weather App',
    name: 'Rick Fencl',
  });
});

app.get('/about', (req, res) => {
  // default (index) route
  res.render('about', { title: 'About Me', name: 'Rick Fencl' });
});

app.get('/help', (req, res) => {
  // default (index) route
  res.render('help', {
    title: "Help! I'm a rock",
    message: 'This page will help you with your problems.',
    name: 'Paul Bunyan',
  });
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address.' });
  }
  
  run(req.query.address, (response) => res.send({ 
    forecast: response,
    location: coords.location,
    address: req.query.address,
   }));
  
});
/**
 * This Route is to just show how I can dump everything.
 */
app.get('/getAll', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address.' });
  }

  run(req.query.address, (response) =>
    res.send({
      forecast: response,
      location: formattedLocation,
      location2: coords.location,
      address: req.query.address,
      coords: coords,
    })
  );
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help Article Not Found ',
    name: 'Chuck Norris',
  });
});

app.get('*', (req, res) => {
  res.render('error', { message: 'Page Not Found.', name: 'Tiny Tim' });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
