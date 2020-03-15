const db = require("../data/dbConfig");

const addFunnel = async funnel => {
    return await db("funnels").insert(funnel).returning('*')
}

const getFunnelBy = async filter => {
    return await db("funnels").where(filter)
}

const updateFunnel = async (id, info) => {
    return await db("funnels").where({id}).update(info)
}

module.exports = {
    addFunnel,
    getFunnelBy,
    updateFunnel
}