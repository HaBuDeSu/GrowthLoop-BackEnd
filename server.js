const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./user/userRouter")
const orgRouter = require("./organization/organizationRouter")

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/orgs", orgRouter);

server.get("/", (req, res) => {
    res.send("Backend Server for GrowthLoop")
})

module.exports = server