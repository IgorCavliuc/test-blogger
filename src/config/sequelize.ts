import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '5555',
    database: 'node_postgres',
    logging: false,
    define: {
        createdAt: 'created_at',
        updatedAt: false,
    },
});

export default sequelize;
