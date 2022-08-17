const { ObjectId } = require('mongodb')
// const { default: mongoose } = require('mongoose')
const mongoose = require("mongoose");
const { updateEvent } = require('../controllers/event_controller');
const mongodb = require('../database/mongodb')

//Model for Event
const Event = require ('../models/event')


const collectionName = 'events'
const collection = mongodb.db.collection(collectionName)


const model = {

    listEvents:  () => {
        // console.log("model list event")
        const cursor = collection.find()
        return  cursor.toArray()
    },

    showEvent: async (docID) => {
        const cursor = await Event.findById(docID).exec(); 
        return cursor
    },

    // getEvent: eventID => {
    //     return collection.findOne(ObjectId(eventID))
    // },

    createEvent: fields => {
        return collection.insertOne(fields)
    },

    deleteEvent: async (docID) => {
        await Event.findByIdAndDelete(docID);
        // await listingModel.findByIdAndDelete(listingId).exec();
        console.log("deleteEvent in eventModel.js done")
    },

    editEvent: async (docID) => {
        const cursor = await Event.findById(docID); 
        return cursor
    },

    updateEvent: async (docID, data) => {
        console.log("------------------------!!!------------", docID)
        const cursor = await Event.findById(docID)

        console.log("------------------------!!!------------", cursor)

        const payload = {
            eventTitle: data.eventTitle,
            description: data.description,
            date: data.date
        }
        await Event.findOneAndUpdate({ _id: docID }, payload );

        return cursor
    }

}

// //create model // from here: https://mongoosejs.com/docs/models.html
// const EventModel = mongoose.model('EventModel', model)

module.exports = model