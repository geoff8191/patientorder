const express = require('express');
const router = express.Router();
const patientsService = require('../services/patientsService');

router.post('/', async (req, res) => {
    try {
        const msg = await patientsService.createPatient(req.body);
        res.status(201).json(msg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const msg = await patientsService.getAllPatients();
        res.status(200).json(msg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;