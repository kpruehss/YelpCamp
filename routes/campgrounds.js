const express = require('express');
const Campground = require('../models/campground');
let router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('./campgrounds/index', {
        campgrounds: campgrounds,
        currentUser: req.user,
      });
    }
  });
});

router.post('/', (req, res) => {
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

router.get('/new', (req, res) => {
  res.render('./campgrounds/new');
});

// SHOW - shows more info about campground with :id
router.get('/:id', (req, res) => {
  // Find campground with :id
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, campground) => {
      if (err) {
        console.log(err);
      } else {
        // Render the showgrounds with :id
        res.render('./campgrounds/show', {campground: campground});
      }
    });
});

module.exports = router;
