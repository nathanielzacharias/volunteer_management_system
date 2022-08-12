//const Product = require("../models/user");
const mongoose = require("mongoose");
const User = require("../models/user");
const mongoURI = 'mongodb://localhost:27017/volunteer_management_system'
//mongoose.set('useFindAndModify', false)
//mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )


//create your array. i inserted only 3 objects here
const users = [   
  new User(
  {
    username: 'mig',
    password: 'mig',
    email: 'mig@improv.com',
    mobile: 83025808, 
    admin: true, 
  }),
  
  new User(
  {
    username: 'mel',
    password: 'mel',
    email: 'mel@gmail.com',
    mobile: null, 
    admin: false, 
  }),

  new User (
  {
    username: 'nic',
    password: 'nic',
    email: 'nic@gmail.com',
    mobile: null, 
    admin: false, 
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
users.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});