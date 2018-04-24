// ------------APP REQUIREMENTS-------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const seedDB = require('./seeds');

const campgroundRoutes = require('./routes/campgrounds.js');
const commentRoutes = require('./routes/comments.js');
const indexRoutes = require('./routes/index.js');

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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// -----------MONGO DB CONFIG-----------

// Connect to mongoDB
mongoose.connect('mongodb://localhost/yelp_camp');

// ------------SERVER INSTANCE----------------
app.listen(app.get('port'), () => {
  console.log('yelpCamp Server started');
});
