require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
//express-session
//bcrypt

const eventController = require('./controllers/event_controller.js')

const app = express()
const port = process.env.PORT || 3000 //first part is for heroku

//use ejs template engine
app.set('view engine', 'ejs')

//use public dir:
app.use(express.static('public'))

//use middleware for request parsing
app.use(express.urlencoded({extended: true}))

//use methodOverride
app.use(methodOverride('_method'))

//connect to mongo Atlas
const mongoURI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.ru8xaxp.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "test"

// Server
app.listen(port, async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.log(`Failed to connect to Mongo Atlas`);
    process.exit(1);
  }
  console.log(`VolunteerManagementSystem is listening on port ${port}`);
});

//home
app.get('/', (req, res) => {
  res.render('loginForm.ejs');
})

//login
app.get('/login', (req, res) => {
  res.render('loginForm.ejs');
})

//register
app.get('/register', (req, res) => {
  res.render('registerForm.ejs');
})

//create new event
// app.get('/createNewEvent', eventController.newEventForm)
// app.post('/events', eventController.createNewEvent)

//Event
// 1) Index
app.get('/events', eventController.indexEvent)
// 2) New
// app.get("/listings/new", authMiddleware.isAuthenticated, listingController.showNewListingForm);
app.get('/events/new', eventController.newEventForm)
// app.get('/events/create', eventController.newEventForm)
// // 3) Show
// app.get("/listings/:listingId", authMiddleware.isAuthenticated, listingController.showListing);
// // 4) Create
// app.post("/listings", upload.single("listing_image"), listingController.createListing);
// // 5) Destroy
// app.delete("/listings/:listingId", listingController.deleteListing);
// // 6) Edit
// app.get(
//   "/listings/:listingId/edit",
//   authMiddleware.isAuthenticated,
//   listingController.showEditListingForm
// );
// // 7) Update
// app.put("/listings/:listingId", upload.single("listing_image"), listingController.updateListing);

