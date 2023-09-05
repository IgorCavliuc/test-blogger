import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_postgres', 'postgres', '5555', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
