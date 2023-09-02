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
        // Имя столбца для даты создания
        createdAt: 'created_at',

        // Если вы не используете дату обновления, можете отключить ее
        updatedAt: false,
    },
});

export default sequelize;
