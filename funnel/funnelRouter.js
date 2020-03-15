const express = require("express");
const router = express.Router();
const Funnel = require("./funnelModel");

router.post("/", async (req, res) => {
    const funnel = req.body
    try {
        const newFunnel = await Funnel.addFunnel(funnel)
        res.status(201).json({message: "Added Funnel", funnel: newFunnel})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Create Funnel", error: error})
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const funnel = await Funnel.getFunnelBy({id})
        res.status(200).json({funnel: funnel})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get Funnel", error: error})
    }
})

router.get("/:organization_id", async (req, res) => {
    const {organiztion_id} = req.params
    try {
        const funnelList = await Funnel.getFunnelBy({organiztion_id})
        res.status(200).json({message: "Got Funnels", funnelList: funnelList})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get Funnels", error: error})
    }
})

module.exports = router;