const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: "Cloud's Rest",
    image:
      'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60',
    description:
      'Jerky beef ribs qui bresaola, velit laborum prosciutto.  Salami anim picanha ball tip, tri-tip pancetta adipisicing consequat cow labore andouille.  Ground round ut occaecat pork loin tongue aliquip et.  Ut in ex pariatur andouille leberkas culpa.  Brisket cupim pork chop quis, beef short ribs bresaola aliqua flank ea meatloaf.  Lorem ham fatback shank nulla.  Esse nisi salami sint.',
  },
  {
    name: 'Grand Campyon',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=500&q=60',
    description:
      'Jerky beef ribs qui bresaola, velit laborum prosciutto.  Salami anim picanha ball tip, tri-tip pancetta adipisicing consequat cow labore andouille.  Ground round ut occaecat pork loin tongue aliquip et.  Ut in ex pariatur andouille leberkas culpa.  Brisket cupim pork chop quis, beef short ribs bresaola aliqua flank ea meatloaf.  Lorem ham fatback shank nulla.  Esse nisi salami sint.',
  },
  {
    name: 'Lightshow Woods',
    image:
      'https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=500&q=60',
    description:
      'Jerky beef ribs qui bresaola, velit laborum prosciutto.  Salami anim picanha ball tip, tri-tip pancetta adipisicing consequat cow labore andouille.  Ground round ut occaecat pork loin tongue aliquip et.  Ut in ex pariatur andouille leberkas culpa.  Brisket cupim pork chop quis, beef short ribs bresaola aliqua flank ea meatloaf.  Lorem ham fatback shank nulla.  Esse nisi salami sint.',
  },
];

const seedDB = function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      // add a few campgrounds
      data.forEach(seed => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Added a campground');
            // create comment
            Comment.create(
              {
                text: "This place is great but there's no Wifi!",
                author: 'Homer',
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
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
