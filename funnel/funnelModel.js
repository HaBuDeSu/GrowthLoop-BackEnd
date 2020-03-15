const db = require("../data/dbConfig");

const addFunnel = async funnel => {
    return await db("funnels").insert(funnel).returning('*')
}

const getFunnelBy = async filter => {
    return await db("funnels").where(filter).first()
}

module.exports = {
    addFunnel,
    getFunnelBy
}