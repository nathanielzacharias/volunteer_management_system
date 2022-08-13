const {ObjectId} = require('mongodb')
const model = require('../models/eventModel')
const eventModel = require('../models/eventModel.js')


const controller = {

    listEvent: async (req, res) => {
        const eventData = await eventModel.listEvent()

        res.render('showEvents.ejs', {
            myPageTitle: "All Events",
            events: eventData
        })
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

    // showPokemon: async (req, res) => {
    //     // get the pokemon id from route param
    //     const pokemonID = req.params.pokemon_id

    //     // validate valid object ID
    //     if (!ObjectId.isValid(pokemonID)) {
    //         res.render('show', {
    //             p: [],
    //             errMsg: "object id is not valid",
    //         })
    //         return
    //     }

    //     // get the pokemon with the id from the database
    //     let p = null
    //     try {
    //         p = await model.getPokemon(pokemonID)
    //     } catch(err) {
    //         res.render('show', {
    //             p: [],
    //             errMsg: "failed to retrieve pokemon",
    //         })
    //         return
    //     }

    //     // render the "show" ejs template
    //     res.render('show', {
    //         p: p, // or use short form -> p,
    //         errMsg: "",
    //     })
    // },



}

module.exports = controller