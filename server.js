require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const session = require('express-session');
// const authMiddleware = require('./middlewares/user_auth');

const app = express()
const port = process.env.PORT || 3000 //first part is for heroku

//use ejs template engine
app.set('view engine', 'ejs')

//use public dir:
app.use(express.static('public'))

//use middleware for request parsing
app.use(express.urlencoded({ extended: true }))

//use methodOverride
app.use(methodOverride('_method'))

//use middleware for session 
app.use(session({
  secret: process.env.SESSION_SECRET,
  // resave: false,
  // saveUninitialized: false,
  cookie: { secure: false, httpOnly: false, maxAge: 5 * 60 * 60 * 1000 }
}));
// app.use(authMiddleware.setAuthUser);

//connect to mongo Atlas
const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.ru8xaxp.mongodb.net/?retryWrites=true&w=majority`;
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


//----------------------------ROUTES---------------------------------
const eventController = require('./controllers/event_controller.js')
const loggedIn = require('./middlewares/loggedIn')

//home
app.get('/', loggedIn.loggedIn, eventController.indexEvent)

//show success page
app.get('/success/:username', loggedIn.loggedIn, (req, res) => res.render('success',{username: req.params.username}))
app.get('/success', loggedIn.loggedIn, (req, res) => res.render('success', {username: null}))

//Events
// 1) Index
app.get('/events', loggedIn.loggedIn, eventController.indexEvent)
// 2) New
app.get("/events/new", loggedIn.loggedIn, eventController.newEventForm)
// 6) Edit 
app.get("/events/:eventsId/edit", loggedIn.loggedIn, eventController.showEditEventForm); //more specific route to come first
// 3) Show 
app.get("/events/:eventsId", loggedIn.loggedIn, eventController.showEvent);
// 4) Create 
app.post("/events", loggedIn.loggedIn, eventController.createEvent);
// 5) Destroy
app.delete("/events/:eventsId", loggedIn.loggedIn, eventController.deleteEvent);
// 7) Update 
app.put("/events/:eventsId", loggedIn.loggedIn, eventController.updateEvent);

//Users
const userController = require('./controllers/user_controller.js');
const { listEvents } = require('./models/eventModel.js');
app.get('/register', loggedIn.loggedIn, userController.showRegisterForm)
app.post('/register', loggedIn.loggedIn, userController.register)

//login
app.get('/login', loggedIn.loggedIn, (req, res) => res.render('loginForm'))
app.post('/login', loggedIn.loggedIn, userController.login)
app.get('/logout', loggedIn.loggedIn, userController.logout)

//profile
// app.post('/profile/:eventsId', loggedIn.loggedIn, userController.addEventToProfile)
app.get('/profile', loggedIn.loggedIn, userController.indexProfile)
