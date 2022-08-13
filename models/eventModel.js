const { ObjectId } = require('mongodb')
const mongodb = require('../database/mongodb')
const collectionName = 'events'
const collection = mongodb.db.collection(collectionName)

const model = {

    listEvents:  () => {
        console.log("model list event")
        const cursor = collection.find()
        return  cursor.toArray()
    },

    showEvent: () => {
        const cursor = collection.findOne()
        return cursor
    },

    // getEvent: eventID => {
    //     return collection.findOne(ObjectId(eventID))
    // },

    // createEvent: fields => {
    //     return collection.insertOne(fields)
    // },

    // deleteEvent: (docID) => {
    //     collection.deleteOne(docID)
    // }

}

module.exports = model