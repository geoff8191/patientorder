const express = require('express');
const cors = require('cors');
const sequelize = require('./dbCon/db');
const patientsRoutes = require('./routes/patientsRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

sequelize.connect().then(() => {
    app.use('/api/patients', patientsRoutes);
    app.use('/api/order', orderRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
