const joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const movieShcema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});
const movie = mongoose.model('movies', movieShcema);
function validateMovie(movie) {
    const schema = {
        title: joi.string().min(5).max(50).required(),
        genreId: joi.string().required,
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    };
    return joi.validate(movie, schema);
}

exports.movie = movie;
exports.validateMovie = validateMovie;
exports.movieShcema=movieShcema;