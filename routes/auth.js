const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const route = express.Router();

route.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("email not found or incorrect password");

    const verified = await bcrypt.compare(req.body.password, user.password);
    if (!verified) return res.status(404).send("email not found or incorrect password");

    const token = user.generateAuthToken();
    return res.header("x-auth-token", token).send("login succesfully");
})

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(16).required()
    })

    return schema.validate(user);
}

module.exports = route;