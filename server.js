const express = require('express');
const AccountsRouter = require("./accounts/AccountRouter");
const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req,res) => {
    res.send("Server Operational")
});

module.exports = server;