const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gym'
}

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM clientes WHERE nombre = ? AND contraseña = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"idClientes": result[0].idClientes,
					"Nombre": result[0].Nombre,
					"ApellidoPaterno": result[0].ApellidoPaterno,
					"ApellidoMaterno": result[0].ApellidoMaterno,
                    "Rut": result[0].Rut,
				})

			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.post('/api/registro', (req,res) =>{
	const {nombre, apellido_paterno,apellido_materno,rut,fecha_nacimiento, password} = req.body
	const values = [nombre,apellido_paterno,apellido_materno,rut,fecha_nacimiento,password]
	var connection = mysql.createConnection(credentials)
	connection.query("INSERT INTO clientes (Nombre,ApellidoPaterno,ApellidoMaterno,Rut,fechaNacimiento,contraseña) VALUES(?,?,?,?,?,?)", values, (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json({message:"nuevo usuario agregado"})
		}
	})
	connection.end()
})

app.get('/api/clientes', (req,res) =>{
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM clientes", (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json(result)
		}
	})
	connection.end()
})

/// planes
// Traer todos los planes
app.get('/api/planes', (req,res) =>{
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM planes", (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json(result)
		}
	})
	connection.end()
})

// admin agrega un plan

app.post('/api/planes/agregar', (req,res) =>{
	const {nombre, precio, horas} = req.body
	const values = [nombre, precio, horas]
	var connection = mysql.createConnection(credentials)
	connection.query("INSERT INTO planes (Nombre, Precio ,Horas ) VALUES(?,?,?)", values, (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json({message:"Plan AGREGADO"})
		}
	})
	connection.end()
})

app.listen(4000, () => console.log('hola soy el servidor'))