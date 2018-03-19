// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

// Database connection, Schema and Modal config
mongoose.connect('mongodb://localhost/yelp_camp');

// SCHEMA
const campgroundSchema = new mongoose.Schema({
  image: String,
  name: String,
});

// Model
const Campground = mongoose.model('Campground', campgroundSchema);

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app
  .route('/campgrounds')
  .get((req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds', {campgrounds: campgrounds});
      }
    });
  })
  .post((req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, campground) => {
      if (err) {
        console.log(err);
      } else {
        // redirect to campgrounds page
        res.redirect('/campgrounds');
      }
    });
  });

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

// Server instance
app.listen(app.get('port'), () => {
  console.log('yelpCamp Server started');
});
