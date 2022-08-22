require('dotenv').config()

const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const controller = {

  showRegisterForm: (req, res) => {
    res.render('registerForm.ejs');
  },

  register: async (req, res) => {

    //hash password using bcrypt
    const hash = await bcrypt.hash(req.body.password, 10);

    //create document in Mongo Atlas using mongoose.create
    try {
      const user = await userModel.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        admin: req.body.admin
      });

      res.redirect('/success')

    } catch (err) {
      console.log(`Error registering new user (user_controller: register): ${err}`);
      res.render('Error registering new user (user_controller: register)');
      return;
    }


  },

  login: async (req, res) => {
    try {
      const user = await userModel.findOne({
        username: req.body.username
      })

      const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!passwordCorrect) { res.send('password wrong') }

      req.session.regenerate(() => {
        req.session.user = user.username;
        req.session.save(() => {
          res.redirect(`/success/${user.username}`);
        });
      })

    } catch (err) {
      res.send('username or password error')
      return
    }
  },

  logout: async (req, res) => {
    req.session.user = null;

    req.session.save ( () => {
      req.session.regenerate ( () => {
        res.redirect('/events')
      })
    })

  },

  indexProfile: async (req, res) => {

    // console.log('------------------------username:', req.session.user)
    // console.log('req.body', req.body)

    try {
      const user = await userModel.findOne({
        username: req.session.user
      })
      // console.log('------------------------user.volunteeringFor:', user.volunteeringFor)


      res.render('indexProfile.ejs', {
        myPageTitle: req.session.user,
        volunteeringFor: user.volunteeringFor
      })

    } catch (err) {
      res.send("user_controller > showProfile catch")
    }
  },

  addEventToProfile: async (req, res) => {
    const eventModel = require ('../models/eventModel')

    try {

      //get and prepare event data
      const eventDocID = req.params.eventsId
      const eventData = await eventModel.showEvent(eventDocID)

      //data to enter into user document
      const volunteeringFor = {
        eventTitle: eventData.eventTitle,
        description: eventData.description,
        date: eventData.date
      }

      //find and update user Model
      const user = await userModel.findOneAndUpdate(
      { username: req.session.user }, 
      { $push: {volunteeringFor: volunteeringFor} }
      )

      res.redirect('/profile')
      
    } catch (err) {
      res.send("user_controller > addEventToProfile catch")      
    }
  }


}

module.exports = controller