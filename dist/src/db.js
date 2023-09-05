"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    password: "5555",
    host: "localhost",
    port: 5432,
    database: "node_postgres"
});
exports.default = pool;
