const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./user/userRouter")

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/user/register", userRouter);

server.get("/", (req, res) => {
    res.send("Backend Server for GrowthLoop")
})