const express = require("express");
const { UserModel } = require("../Model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
    const { name, email, phone, label } = req.body;
    const user = await UserModel.findOne({ email })
    try {
        if (user) {
            res.status(201).send({ "message": "User is already present with this email" })
        }
        else {
            const newUser = new UserModel({
                name, email, phone, label, booked_slots: []
            })
            await newUser.save();
            res.status(200).send({ "message": "New User is added", "user": newUser })
        }
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": err })
    }
})

userRouter.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            let users = await UserModel.find({ name });
            res.status(200).send(users)
        }
        else {
            let users = await UserModel.find();
            res.status(200).send(users)
        }
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": error })
    }
})

userRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndUpdate({ _id: id }, req.body);
        const users = await UserModel.find();
        res.status(200).send({ "message": "User is updated", "users": users })
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": error })
    }
})

userRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete({ _id: id });
        const users = await UserModel.find();
        res.status(200).send({ "message": "User is deleted", "users": users })
    } catch (error) {
        res.status(400).send({ "message": "Something went wrong", "err": error })
    }
})

module.exports = { userRouter };