// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app
  .route('/campgrounds')
  .get((req, res) => {
    const campgrounds = [
      {
        name: 'Salmon Creek',
        image:
          'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f3c578a4eeb5_340.jpg',
      },
      {
        name: 'Granite Hill',
        image:
          'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f1c27da6e9b1bd_340.jpg',
      },
      {
        name: 'Mountain Goat\'s Rest',
        image:
          'https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104497f1c27da6e9b1bd_340.jpg',
      },
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
  })
  .post((req, res) => {
    res.send('You hit the post route');
    // get data from form and add to campgrounds array, redirect
  });

// Server instance
app.listen(3000, () => {
  console.log('yelpCamp Server started');
});
