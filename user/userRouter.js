const express = require("express");
const router = express.Router();
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
    let {username, password} = req.body
    try {
        const user = await User.getUserBy({username})
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user)
            res.status(200).json({
                message: "Successful Login",
                token
            })
        }
    }
    catch(error) {
        res.status(500).json({message: "invalid credentials"})
    }
})

router.put("/users/:userId", async (req, res) => {
    const {userId} = req.params
    const user = req.body
    try {
        await User.updateUser(userId, user)
        res.status(201).json({message: "Updated User"})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Update User", error: error})
    }
})

router.delete("/users/:userId", async (req, res) => {
    const {userId} = req.params
    try {
        await User.deleteUser(userId)
        res.status(201).json({message: "Deleted User"})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Delete User"})
    }
})

const genToken = user => {
    const payload = {
      subject: "user login",
      user: user
    };
  
    const secret = process.env.JWT_SECRET;
  
    const options = {
      expiresIn: "1h"
    };
  
    return jwt.sign(payload, secret, options);
  };

  module.exports = router;