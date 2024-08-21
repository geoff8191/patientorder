const Patients = require('../models/patients');
const Orders = require('../models/orders');

const createOrder = async (orderData) => {
    try {
        let patientId = orderData.PatientId
        delete orderData.PatientId
        const res = await Orders.create(orderData);
        await Patients.update(
            { OrderId: res.Id },
            { where: { Id: patientId }, },
        );

        return 'success';
    } catch (error) {
        throw new Error('Error creating orders: ' + error.message);
    }
};

const getOrder = async (id) => {
    try {
        return await Orders.findByPk(id);
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};

const updateOrder = async (id, orderData) => {
    try {
        await Orders.update(
            { Message: orderData.Message },
            { where: { Id: id }, },
        );
        return 'success'
    } catch (error) {
        throw new Error('Error update orders: ' + error.message);
    }
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
};