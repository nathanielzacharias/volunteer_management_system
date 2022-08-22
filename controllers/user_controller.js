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

      res.redirect('success')

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

  

}

module.exports = controller