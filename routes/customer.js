const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const isAuth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();


router.get('/', async (req, res, next) => {
    const customer = await Customer.find().sort('name');
    return res.send(customer);
});

router.post('/', isAuth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });
    if (!cusomter) return res.status(404).send('the id is invalid');
    res.send(customer)
});
router.delete('/:id', async (req, res) => {
    const cusomter = await Customer.findByIdAndRemove(req.body.id);
    if (!cusomter) return res.status(404).send('the id is incorrect');
    res.send(cusomter);
})

router.get('/:id', async (req, res) => {
    const cusomter = await Customer.findById(req.param.id);
    if (!cusomter) return res.status(404).send('invalid id');
    res.send(cusomter);
});
module.exports = router;