import dotenv from 'dotenv'

dotenv.config()

// console.log(process)

export default {
    db_database: process.env.DB_DATABASE,
    db_user: process.env.DB_USER,
    db_port: process.env.DB_PORT,
    db_pass: process.env.DB_PASS,
    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST
}

