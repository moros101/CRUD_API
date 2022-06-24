import pg from "pg";
const {Pool} = pg;

const poolConfig = process.env.DATABASE_URL?{
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
}:{
    user:"postgres",
    password:"admin",
    host: 'localhost',
    port:'5432',
    database:'postgres'
}

export default new Pool(poolConfig);