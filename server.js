require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
//ejs
//express-session
//bcrypt

const controller = require('./controllers/app_controller.js')

const app = express()
const port = process.env.PORT || 3000

//use ejs template engine
app.set('view engine', 'ejs')

//Use public dir:
app.use(express.static('public'))

//use middleware for request parsing
app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))

const mongoURI = 'mongodb://localhost:27017/volunteer_management_system'
//mongoose.set('useFindAndModify', false)
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then (response => {

app.get('/', (req, res) => {
  res.render('loginForm.ejs');
})

app.get('/login', (req, res) => {
  res.render('loginForm.ejs');
})

app.get('/register', (req, res) => {
  res.render('registerForm.ejs');
})

app.get('/events', controller.listEvent)

// create action
app.get('/createNewEvent', controller.newEventForm)
app.post('/events', controller.createNewEvent)

// app.get('/admin/:userID', (req, res) => {
//   res.render('showAdmin.ejs', {
//     userID: adminsCollection[req.params.userID]
//   });
// })

// app.get('/volunteer/:userID', (req, res) => {
//   res.render('showVolunteer.ejs', {
//     userID: volunteersCollection[req.params.userID]
//   });
// })

// app.get('/:indexOfEvent', (req, res) => {
//   res.render('showEvent.ejs', {
//     eventID: eventsCollection[req.params.indexOfEvent]
//   });
// })

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

})//mongoose callback