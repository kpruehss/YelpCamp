const mongoose = require('mongoose');
// Create campground schema
const campgroundSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
});

// Export the model
module.exports = mongoose.model('Campground', campgroundSchema);
