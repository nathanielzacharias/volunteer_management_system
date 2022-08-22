const {ObjectId} = require('mongodb') 
const model = require('../models/eventModel')
const eventModel = require('../models/eventModel')

const controller = {

    indexEvent: async (req, res) => {
        try {
            const eventData = await eventModel.listEvents()

            // console.log(eventData)
    
            res.render('indexEvents.ejs', {
                myPageTitle: "All Events",
                events: eventData
            })

            res.locals.loggedIn = false;

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
                // myPageTitle:req.params.eventsId,
                myPageTitle: oneEventData.eventTitle,
                events: oneEventData
            })
        } catch (error) {
            console.log(error)
        }
    
    },

    createEvent: async (req, res) => {
        const data = req.body

        try {
            await eventModel.createEvent({eventTitle: data.eventTitle, description: data.description, date:data.date})
        } catch(err) {
            res.send('failed to create event')
            return
        }

        // redirect to list events page
        res.redirect('/events')
    },

    deleteEvent:  async (req, res) => {
        const data = req.params.eventsId

        try {
           await  eventModel.deleteEvent(data)
            
        } catch (error) {
            res.send('failed at event_controller deleteEvent')
            return
        }

        // redirect to list events page
        res.redirect('/events')
    },

    showEditEventForm: async (req, res) => {
        
        try {
            const data =  await eventModel.editEvent(req.params.eventsId)

            res.render ('editEventForm', {
                myPageTitle: req.params.eventsId,
                event: data
            })
        } catch (error) {
            console.log(error)
        }

    },

    updateEvent: async (req, res) => {

        const docID = req.params.eventsId 
        const data = req.body
        
        await eventModel.updateEvent(docID, data)
        res.redirect(`/events/${docID}`);
    }


}

module.exports = controller