const express = require("express");
const router = express.Router();
const User = require("./userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    const user = req.body
    try {
        await User.addUser(user)
        res.status(201).json({message: "Added New User", user: user})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Register User", error: error})
    }
})