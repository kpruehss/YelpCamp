const mongoose = require('mongoose');
// Create campground schema
const campgroundSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

// Export the model
module.exports = mongoose.model('Campground', campgroundSchema);

// testing to see if branches match now
