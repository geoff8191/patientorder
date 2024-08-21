const { DataTypes } = require('sequelize');
const sequelize = require('../dbCon/db');

const Patients = sequelize.define('patients', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    },
    Name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
    },
    OrderId: {
        type: DataTypes.INTEGER,
        field: 'order_id',
    }
}, {
    timestamps: false
});

module.exports = Patients;