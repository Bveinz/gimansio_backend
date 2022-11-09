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