const {ObjectId} = require('mongodb') 
const model = require('../models/eventModel')
const eventModel = require('../models/eventModel.js')

const controller = {

    indexEvent: async (req, res) => {
        console.log("listing events")

        try {
            const eventData = await eventModel.listEvent()

            console.log(eventData)
    
            res.render('showEvents.ejs', {
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

    createNewEvent: async (req, res) => {
        const data = req.body

        try {
            eventModel.createEvent({eventTitle: data.eventTitle, description: data.description, date:data.date})
        } catch(err) {
            res.send('failed to create event')
            return
        }

        // redirect to list events page
        res.redirect('/events')
    }


}

module.exports = controller