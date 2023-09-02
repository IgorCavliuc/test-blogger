const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_postgres', 'postgres', '5555', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
