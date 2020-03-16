const db = require("../data/dbConfig.js");

const addOrg = async org => {
    return await db("organizations").insert(org).returning('*')
}

const updateOrg = async (id, info) => {
    return await db("organizations").where({id}).update(info)
}

const getOrgBy = async filter => {
    return await db("organizations").where(filter)
}

const deleteOrg = async orgId => {
    return await db("organizations").where({orgId}).del()
}

module.exports = {
    addOrg,
    updateOrg,
    getOrgBy,
    deleteOrg
}