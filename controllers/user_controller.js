require('dotenv').config()

const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const mongoose = require('mongoose')


//user constroller

// const User = require('../models/user')


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

        // res.render('loginForm')

      } catch (err) {
        console.log(`Error registering new user (user_controller: register): ${err}`);
        res.render('Error registering new user (user_controller: register)');
        return;
      }


    }

}

module.exports = controller