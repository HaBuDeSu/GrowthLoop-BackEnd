const express = require("express");
const router = express.Router();
const Org = require("./organizationModel");

router.post("/", async (req, res) => {
    const org = req.body
    try {
        const newOrg = await Org.addOrg(org)
        res.status(201).json({message: "Added New Organization", orgId: newOrg[0].id})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Could Not Create Org", error: error})
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const org = await Org.getOrgBy({id})
        res.status(200).json({org: org})
    } catch(error) {
        res.status(500).json({message: "Could Not Get Org", error: error})
    }
})

router.put("/:orgId", async (req, res) => {
    const {orgId} = req.params
    const org = req.body
    try {
        await Org.updateOrg(orgId, org)
        res.status(201).json({message: "Updated Org"})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Update Org", error: error})
    }
})

router.delete("/:orgId", async (req, res) => {
    const {orgId} = req.params
    try {
        await Org.deleteOrg(orgId)
        res.status(201).json({message: "Deleted Org"})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Delete Org"})
    }
})

  module.exports = router;