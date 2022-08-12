const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a new Schema // https://mongoosejs.com/docs/guide.html
const volunteerSchema = new Schema({
    //userID: String,
    username: String, 
    eventTitleAndRoleTitle:[[String,String]]
}, {timestamps: true});


//create model // from here: https://mongoosejs.com/docs/models.html
const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer

