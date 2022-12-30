const { Genre, validateGenre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    const genre = await Genre.find().sort('name');
    res.send(genre);
})
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('there is error in here');
    res.send(genre);
});
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('invalid id');
});
router.get('/:id', async (req, body) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('invalid id');
    res.send(genre);
});
module.exports = router;