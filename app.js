// ------------APP REQUIREMENTS-------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seeds');

seedDB();

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

// Passport Configuration
app.use(
  require('express-session')({
    secret: 'Arwen is a people',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
        res.render('./campgrounds/index', {campgrounds: campgrounds});
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
  res.render('./campgrounds/new');
});

// SHOW - shows more info about campground with :id
app.get('/campgrounds/:id', (req, res) => {
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

// ================
// COMMENTS ROUTES
// ================

app.get('/campgrounds/:id/comments/new', (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('./comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  // lookup campgrounds using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
  // create new comments
  // connect new comment to campground
  // redirect to campground showpage
});

// ===========
// AUTH ROUTES
// ===========
app.get('/register', (req, res) => {
  res.render('register');
});

// handle sign up logix
app.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// show login form
app.get('/login', (req, res) => {
  res.render('login');
});

// handle login logic
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  (req, res) => {}
);

// ------------SERVER INSTANCE----------------
app.listen(app.get('port'), () => {
  console.log('yelpCamp Server started');
});
