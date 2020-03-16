const db = require("../data/dbConfig.js");

const addUser = async user => {
    return await db("users").insert(user)
}

const updateUser = async (id, info) => {
    return await db("users").where({id}).update(info)
}

const getUserBy = async filter => {
    return await db("users").where(filter).first()
}

const deleteUser = async id => {
    return await db("users").where({id}).del()
}

module.exports = {
    addUser,
    updateUser,
    getUserBy,
    deleteUser
}