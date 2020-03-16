const db = require("../data/dbConfig");

const addEvent = async event => {
    return await db("events").insert(event).returning('*')
}

const getEventBy = async (filter) => {
    return await db("events").where(filter)
}

module.exports = {
    addEvent,
    getEventBy
}