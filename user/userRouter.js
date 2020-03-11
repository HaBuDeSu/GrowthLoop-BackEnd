const express = require("express");
const router = express.Router();
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    let newUser = req.body
    const password = req.body.password
    const {email} = req.body
    newUser.password = bcrypt.hashSync(password, 10)
    try {
        const user = await User.getUserBy({email})
        if(user) {
            res.status(400).json({message: "Email Already Exists"})
        } else {
            try {
                await User.addUser(newUser)
                res.status(200).json({message: "User Created"})
            }
            catch(error) {
                res.status(500).json({message: "Could Not Register User", error: error})
            }
        }
    }
    catch {
        res.status(500).json({message: "Could Not Register User", error: error})
    }
})

router.post("/login", async (req, res) => {
    let {email, password} = req.body
    try {
        const user = await User.getUserBy({email})
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user)
            res.status(200).json({
                message: "Successful Login",
                token
            })
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    }
    catch(error) {
        res.status(500).json({message: "invalid credentials"})
    }
})

router.get("/:id", async (req, res) => {
    let {id} = req.params
    try {
        const user = await User.getUserBy({id})
        res.status(200).json({user: user})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get User"})
    }
})

router.put("/:userId", async (req, res) => {
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

router.delete("/:userId", async (req, res) => {
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