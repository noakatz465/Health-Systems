const express = require('express');
const router = express.Router();
const controller = require('../controlers/VaccineManufacturerController');

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get('/:name', async (req, res, next) => {
    try {
        const member = await controller.get(req.params.name);
        res.json(member);
    } catch (error) {
        if (error.message == 'Invalid vaccine name!')
            res.status(404).send('Vaccine not found');
        else
            next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error.message == 'Invalid new vaccine name!')
            res.status(400).send(`Vaccine with name ${req.body.name} invalid`);
        else
            next(error);
    }
})

router.delete('/:name', async (req, res, next) => {
    try {
        const result = await controller.delete(req.params.name);
        res.json(result);
    } catch (error) {
        if (error.message.startsWith('Invalid vaccine name')) {
            res.status(404).send(`Could not delete vaccine with name ${req.params.name}, vaccine not found`);
        } else {
            next(error);
        }
    }
});

module.exports = router;