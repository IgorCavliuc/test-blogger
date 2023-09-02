import { Pool } from 'pg';

const pool = new Pool({
    user:"postgres",
    password:"5555",
    host:"localhost",
    port:5432,
    database:"node_postgres"
})


export default pool;