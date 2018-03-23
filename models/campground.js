const mongoose = require('mongoose');
// Create campground schema
const campgroundSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
});

module.exports = mongoose.model('Campground', campgroundSchema);
