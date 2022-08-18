//user constroller

// const User = require('../models/user')


const controller = {

    showRegisterForm: (req, res) => {
        res.render('registerForm.ejs');
      },

}

module.exports = controller