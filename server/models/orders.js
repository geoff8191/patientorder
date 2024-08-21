const { DataTypes } = require('sequelize');
const sequelize = require('../dbCon/db');

const Orders = sequelize.define('orders', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    },
    Message: {
        type: DataTypes.STRING,
        field: 'message',
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = Orders;