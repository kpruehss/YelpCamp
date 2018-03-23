const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Cloud\'s Rest',
    image:
      'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60',
    description: 'Stuff goes here',
  },
  {
    name: 'Grand Campyon',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=500&q=60',
    description: 'More Stuff goes here',
  },
  {
    name: 'Lightshow Woods',
    image:
      'https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=500&q=60',
    description: 'Even more Stuff goes here',
  },
];

const seedDB = function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      // add a few campgrounds
      data.forEach((seed) => {
        Campground.create(seed, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Added a campground');
            // create comment
            Comment.create(
              {
                text: 'This place is great but there\'s no Wifi!',
                author: 'Homer',
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  Campground.comments.push(comment);
                  Campground.save();
                }
              }
            );
          }
        });
      });
    }
  });
};

module.exports = seedDB;
