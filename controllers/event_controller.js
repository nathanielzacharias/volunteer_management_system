const {ObjectId} = require('mongodb') 
const model = require('../models/eventModel')
const eventModel = require('../models/eventModel.js')

const controller = {

    indexEvent: async (req, res) => {
        try {
            const eventData = await eventModel.listEvents()

            console.log(eventData)
    
            res.render('indexEvents.ejs', {
                myPageTitle: "All Events",
                events: eventData
            })
        } catch (error) {
            console.log(error)
        }
    },

    newEventForm: (req, res) => {
        res.render('newEventForm')
    },

    showEvent: async (req, res) =>{
        try {

            const oneEventData = await eventModel.showEvent(req.params.eventsId)

            res.render('showEvent.ejs', {
                myPageTitle:req.params.eventsId,
                oneEvent: oneEventData
            })
        } catch (error) {
            console.log(error)
        }
    
    },

    createEvent: async (req, res) => {
        const data = req.body

        try {
            eventModel.createEvent({eventTitle: data.eventTitle, description: data.description, date:data.date})
        } catch(err) {
            res.send('failed to create event')
            return
        }

        // redirect to list events page
        res.redirect('/events')
    },

    deleteEvent: async (req, res) => {
        const data = req.body

        try {
            eventModel.deleteEvent({docID: data._id})
            
        } catch (error) {
            res.send('failed at event_controller deleteEvent')
            return
        }

        // redirect to list events page
        res.redirect('/events')
    }


}

module.exports = controller