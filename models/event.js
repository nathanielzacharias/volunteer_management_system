const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a new Schema // https://mongoosejs.com/docs/guide.html
const eventSchema = new Schema({
  //eventId: ObjectID, 
  eventTitle: { type: String, required: true },
  description: { type: String, required: true },
  date:  { 
    type: String,
    required: true 
  },
  //createdBy: get from userID
}, {timestamps: true});


//create model // from here: https://mongoosejs.com/docs/models.html
const Event = mongoose.model('Event', eventSchema)

module.exports = Event

