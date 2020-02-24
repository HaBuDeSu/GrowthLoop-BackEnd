const db = require("../data/dbConfig.js");

module.exports = {
    addUser,
    updateUser,
    getUserBy,
    deleteUser
}

const addUser = async user => {
    return await db("users").insert(user)
}

const updateUser = (userId, info) => {
    return await db("users")
}

const getUserBy = async filter => {
    return await db("users").where(filter).first()
}

const deleteUser = userId => {
    return await db("users").where({userId}).del()
}