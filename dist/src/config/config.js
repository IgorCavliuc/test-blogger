"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('node_postgres', 'postgres', '5555', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
