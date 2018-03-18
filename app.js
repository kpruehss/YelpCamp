const express = require('express');
const app = express();

// Set render engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds');
});

// Server instance
app.listen(3000, () => {
  console.log('yelpCamp Server started');
});
