//const Product = require("../models/user");
const mongoose = require("mongoose");
const Volunteer = require("../models/volunteer");
const mongoURI = 'mongodb://localhost:27017/volunteer_management_system'
//mongoose.set('useFindAndModify', false)
//mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )


//create your array. i inserted only 3 objects here
const volunteers = [   
new Volunteer(
    {
        username:'mig' ,
        eventTitleAndRoleTitle:[['Improv Festival','Stage Management']]
    }),
  
new Volunteer(
    {
        username:'mel' ,
        eventTitleAndRoleTitle:[['Improv Festival','Front of House']]
    }),

new Volunteer(
    {
        username:'nic' ,
        eventTitleAndRoleTitle:[
            ['Improv Festival','Front of House'],
            ['dans Festival', 'Guide']
        ]
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
volunteers.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === volunteers.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});