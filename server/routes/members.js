const express = require('express');
const router = express.Router();
const controller = require('../controlers/MemberController');

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get('/:numberId', async (req, res, next) => {
    try {
        const member = await controller.get(req.params.numberId);
        res.json(member);
    } catch (error) {
        if (error.message == 'Invalid member id!')
            res.status(404).send('Member not found');
        else
            next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error.message == 'Invalid new member id!')
            res.status(400).send(`Member with id ${req.body.numberId} invalid`);
        else
            next(error);
    }
})

router.put('/', async (req, res, next) => {
    try {
        const result = await controller.update(req.body)
        res.json(result)
    } catch (error) {
        if (error.message.startsWith('Invalid member Id')) {
            res.status(404).send(`could not update member id , member not found`)
        }
        else next(error);
    }
});

router.delete('/:numberId', async (req, res, next) => {
    try {
        const result = await controller.delete(req.params.numberId);
        res.json(result);
    } catch (error) {
        if (error.message.startsWith('Invalid member Id')) {
            res.status(404).send(`Could not delete member with id ${req.params.numberId}, member not found`);
        } else {
            next(error);
        }
    }
});

module.exports = router;