const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 100,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "secret")
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(16).required()
    })
    return schema.validate(user);
}

module.exports.User = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;