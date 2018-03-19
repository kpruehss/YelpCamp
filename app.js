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

Campground.create(
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60',
  },
  (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Saving new campground: ');
      console.log(campground);
    }
  }
);

// Test data. Will be replaced with mongoDB
let campgrounds = [
  {
    name: 'Granite Hill',
    image:
      'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Mountain Goat\'s Rest',
    image:
      'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-0.3.5&s=7fe3ce3d0c1333c5e2463f73d9652bac&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&s=4d89bf439f74db2b2ff83dd9ed0ceee9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Granite Hill',
    image:
      'https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&s=39cf9cad99479c33ce5943fde1093c6f&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Mountain Goat\'s Rest',
    image:
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&s=adf3225f314db1ac216ea22b6e58e925&auto=format&fit=crop&w=500&q=60',
  },
];
// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app
  .route('/campgrounds')
  .get((req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
  })
  .post((req, res) => {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgrounds.push(newCampground);

    // redirect to campgrounds page
    res.redirect('/campgrounds');
  });

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

// Server instance
app.listen(app.get('port'), () => {
  console.log('yelpCamp Server started');
});
