const express = require('express');
const router = express.Router();
const ordersService = require('../services/ordersService');

router.post('/', async (req, res) => {
    if (!req.body.PatientId || !req.body.Message) {
        res.status(400).json('Missing required parameters');
        return
    }
    try {
        const msg = await ordersService.createOrder(req.body);
        res.status(201).json(msg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await ordersService.getOrder(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    if (!req.body.Message) {
        res.status(400).json('Missing required parameters');
        return
    }
    try {
        const msg = await ordersService.updateOrder(req.params.id, req.body);
        res.status(200).json(msg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;