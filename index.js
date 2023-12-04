const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { userRouter } = require("./Router/user.router");
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use("/users", userRouter);
app.get("/", (req, res) => {
    res.end("Welcome")
})

app.listen(5000, async () => {
    try {
        const connection = mongoose.connect(process.env.mongoURL);
        console.log("Connected to DB")
    } catch (error) {
        console.log(error);
    }
})