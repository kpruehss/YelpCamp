const express = require('express');
const app = express();

// Set render engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    {
      name: 'Salmon Creek',
      image: 'https://pixabay.com/en/travel-adventure-camping-night-2604981/',
    },
    {
      name: 'Granite Hill',
      image: 'https://pixabay.com/en/tent-camping-remote-campsite-1208201/',
    },
    {
      name: 'Mountain Goat\'s Rest',
      image: 'https://pixabay.com/en/night-stars-galaxy-wonder-camp-839807/',
    },
  ];
  res.render('campgrounds', {campgrounds: campgrounds});
});

// Server instance
app.listen(3000, () => {
  console.log('yelpCamp Server started');
});
