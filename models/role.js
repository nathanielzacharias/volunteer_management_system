const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a new Schema // https://mongoosejs.com/docs/guide.html
const roleSchema = new Schema({
    roleTitle: { type: String, required: true },
    roleDescription: { type: String, required: true },
    volunteerNames: [String], 
    eventTitle: String   
}, {timestamps: true});


//create model // from here: https://mongoosejs.com/docs/models.html
const Role = mongoose.model('Role', roleSchema)

module.exports = Role

