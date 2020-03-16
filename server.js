const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./user/userRouter")
const orgRouter = require("./organization/organizationRouter")
const funnelRouter = require("./funnel/funnelRouter")
const eventRouter = require("./event/eventRouter")

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/orgs", orgRouter);
server.use("/api/funnels", funnelRouter);
server.use("/api/events", eventRouter);

server.get("/", (req, res) => {
    res.send("Backend Server for GrowthLoop")
})

module.exports = server