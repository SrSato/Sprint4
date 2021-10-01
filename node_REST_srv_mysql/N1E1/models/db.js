const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const mysql = require('mysql2/promise');


async function initializeDB(){

	const host=dbConfig.HOST;
	const port=dbConfig.PORT;
	const user=dbConfig.USER;
	const password=dbConfig.PASSWORD;
	const db=dbConfig.DB;
	
	const connection = await mysql.createConnection({ host,port,user,password});
	await connection.query(`CREATE DATABASE IF NOT EXISTS ${db};`);
	console.log(`CREATE DATABASE IF NOT EXISTS ${db};`);
	await sequelize.sync();	
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	port: dbConfig.PORT,
	dialect: dbConfig.dialect	
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.initializeDB=initializeDB;


module.exports = db;
  