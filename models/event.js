const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
 
  eventTitle: { type: String, required: true },
  description: { type: String, required: true },
  date:  { 
    type: String,
    required: true 
  },
});

//create model // from here: https://mongoosejs.com/docs/models.html
const Event = mongoose.model('Event', eventSchema)

module.exports = Event

