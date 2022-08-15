const { ObjectId } = require('mongodb')
// const { default: mongoose } = require('mongoose')
const mongoose = require("mongoose");
const mongodb = require('../database/mongodb')
const collectionName = 'events'
const collection = mongodb.db.collection(collectionName)


const model = {

    listEvents:  () => {
        console.log("model list event")
        const cursor = collection.find()
        return  cursor.toArray()
    },

    showEvent: async (docID) => {
        const cursor = await collection.findById(docID).exec(); //example code: await Adventure.findById(id, 'name length').exec();
        // const cursor = collection.findOneById(docID)
        return cursor
    },

    // getEvent: eventID => {
    //     return collection.findOne(ObjectId(eventID))
    // },

    createEvent: fields => {
        return collection.insertOne(fields)
    },

    deleteEvent: (docID) => {
        collection.deleteOne(docID)
    },

    editEvent: () => {
        const cursor = collection.findOne()
        return cursor
    }

}

module.exports = model