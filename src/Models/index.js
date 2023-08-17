import { Sequelize } from 'sequelize'
import envFile from '../Config/config.js'

const { db_database, db_pass, db_user, db_dialect, db_port, db_host } = envFile

const sequelize = new Sequelize(db_database,db_user,db_pass,{
    host: db_host,
    port: db_port,
    dialect: db_dialect
})


export default sequelize