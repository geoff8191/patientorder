const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
});

sequelize.connect = async function () {
    try {
        await sequelize.authenticate();
        // await sequelize.sync();
        console.log('Database connection successfully.');
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

module.exports = sequelize;