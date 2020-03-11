const db = require("../data/dbConfig.js");

const addUser = async user => {
    return await db("users").insert(user)
}

const updateUser = async (userId, info) => {
    return await db("users")
}

const getUserBy = async filter => {
    return await db("users").where(filter).first()
}

const deleteUser = async userId => {
    return await db("users").where({userId}).del()
}

module.exports = {
    addUser,
    updateUser,
    getUserBy,
    deleteUser
}