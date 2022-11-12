const pool = require("../config/Conexion")


exports.ver_planes = (req,res) =>{
	pool.query("SELECT * FROM planes", (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json(result)
		}
	})
};

exports.AgregarPlan = (req,res) =>{
	const {nombre, precio, horas} = req.body
	const values = [nombre, precio, horas]
	pool.query("INSERT INTO planes (Nombre, Precio ,Horas ) VALUES(?,?,?)", values, (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json({message:"Plan AGREGADO"})
		}
	})
}

exports.Suscripcion = (req,res) => {
	const {idCliente, idPlan} = req.body
	const values  = [idCliente, idPlan]
	pool.query("INSERT INTO clientes_has_planes (Clientes_idClientes, Planes_idPlanes) VALUES(?,?)", values , (err,result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json({message:"Suscripcion Exitosa"})
		}
	})
}

//ver suscripcion
exports.miSuscripcion = (req,res) =>{
	pool.query("SELECT * FROM ", (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json(result)
		}
	})
};