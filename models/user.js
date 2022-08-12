const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a new Schema // https://mongoosejs.com/docs/guide.html
const userSchema = new Schema({
    //userID: ObjectID,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    mobile: Number, 
    admin: Boolean, 
}, {timestamps: true});


//create model // from here: https://mongoosejs.com/docs/models.html
const User = mongoose.model('User', userSchema)

module.exports = User

