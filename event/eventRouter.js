const express = require("express");
const router = express.Router();
const Event = require("./eventModel");

router.post("/", async (req, res) => {
    const event = req.body
    try {
        const newEvent = await Event.addEvent(event)
        res.status(201).json({message: "Added Event", })
    }
    catch(error) {
        res.status(500).json({message: "Could Not Create Event", error: error})
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const event = await Event.getEventBy({id})
        res.status(200).json({event: event})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get Event", error: error})
    }
})