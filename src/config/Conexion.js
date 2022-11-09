const mysql = require("mysql");

const conexion = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gym'
}


const pool = mysql.createConnection(conexion)

module.exports = pool;