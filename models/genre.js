const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre = mongoose.model('genres', genreSchema);
function validateGenre(genre) {
    const schema = {
        name: joi.string().min(5).max(50).required()
    };
    return joi.validate(genre, schema);
}
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;