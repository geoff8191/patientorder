const Patients = require('../models/patients');

const createPatient = async (patientsData) => {
    try {
        await Patients.create(patientsData);
        return 'success';
    } catch (error) {
        throw new Error('Error creating patients: ' + error.message);
    }
};

const getAllPatients = async () => {
    try {
        return await Patients.findAll({ order: [['Id', 'ASC']] });
    } catch (error) {
        throw new Error('Error fetching patients: ' + error.message);
    }
};

module.exports = {
    createPatient,
    getAllPatients,
};