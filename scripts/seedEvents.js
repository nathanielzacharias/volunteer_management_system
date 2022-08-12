//const Product = require("../models/user");
const mongoose = require("mongoose");
const Event = require("../models/event");
const mongoURI = 'mongodb://localhost:27017/volunteer_management_system'
//mongoose.set('useFindAndModify', false)
//mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )


//create your array. i inserted only 3 objects here
const events = [   
new Event(
    {
        eventTitle: 'dans Festival',
        description: 'dance dance baby',
        date: '2022-10-10'
    }),
  
new Event(
    {
      eventTitle: 'Improv Festival',
      description: 'no script, no problem',
      date: '2022-09-09'
    }),

new Event(
    {
        eventTitle: 'cagematch jam',
        description: 'royal rumble with two teams',
        date: '2022-09-01'
    })
]
//connect mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
events.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === events.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});