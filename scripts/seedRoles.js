//const Product = require("../models/user");
const mongoose = require("mongoose");
const Role = require("../models/role");
const mongoURI = 'mongodb://localhost:27017/volunteer_management_system'
//mongoose.set('useFindAndModify', false)
//mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )


//create your array. i inserted only 3 objects here
const roles = [   
new Role(
    {
        roleTitle: 'Front of House',
        roleDescription: 'Ticketing and crowd management',
        volunteerNames: ['mel', 'nic'], 
        eventTitle: 'Improv Festival',
    }),
  
new Role(
    {
        roleTitle: 'Stage Management',
        roleDescription: 'Managing actors behind the scenes',
        volunteerNames: ['mig'], 
        eventTitle: 'Improv Festival',
    }),

new Role(
    {
        roleTitle: 'Guide',
        roleDescription: 'Engage visitors and offer information',
        volunteerNames: ['nic'], 
        eventTitle: 'dans Festival',
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
roles.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === roles.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});