const joi = require('joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customer');
const { movieShcema } = require('./movie');
const Rental = mongoose.model('rental', new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieShcema,
        required: true
    },
    dateout: {
        type: Date,
        required: true,
        default: Date.now
    },
    datereturned: {
        type: Number,
        min: 0
    }
}));

function validateRentals(rental) {
    const schema = {
        customerId: joi.string().required(),
        movieId: joi.string().required()
    }
    return joi.validate(rental, schema);
}

exports.validateRentals = validateRentals;
exports.rentals = Rental;