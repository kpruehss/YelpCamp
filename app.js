// ------------APP REQUIREMENTS-------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Campground = require('./models/campground');

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

// -----------MONGO DB CONFIG-----------

// Connect to mongoDB
mongoose.connect('mongodb://localhost/yelp_camp');

// -------------APP ROUTES--------------
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
        res.render('index', {campgrounds: campgrounds});
      }
    });
  })
  .post((req, res) => {
    // get data from form and construct campground object
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description};

    // Pass campground object and save to DB
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

// SHOW - shows more info about campground with :id
app.get('/campgrounds/:id', (req, res) => {
  // Find campground with :id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render the showgrounds with :id
      res.render('show', {campground: foundCampground});
    }
  });
});

// ------------SERVER INSTANCE----------------
app.listen(app.get('port'), () => {
  console.log('yelpCamp Server started');
});
