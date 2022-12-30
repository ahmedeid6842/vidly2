const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const route = express.Router();
const { User, validateUser } = require("../models/user");

route.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already exsist");
    
    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();

    return res.send(_.pick(user, ["name", "email"]));
})

module.exports = route;