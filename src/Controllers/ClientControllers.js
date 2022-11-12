const pool = require("../config/Conexion")

exports.login = (req, res) => {
    const { username, password } = req.body
	const values = [username, password]
	pool.query("SELECT * FROM clientes WHERE nombre = ? AND contraseña = ?", values, (err, result) => {
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
};
exports.Registro = (req,res) =>{
	const {nombre, apellido_paterno,apellido_materno,rut,fecha_nacimiento, password} = req.body
	const values = [nombre,apellido_paterno,apellido_materno,rut,fecha_nacimiento,password]
	pool.query("INSERT INTO clientes (Nombre,ApellidoPaterno,ApellidoMaterno,Rut,fechaNacimiento,contraseña) VALUES(?,?,?,?,?,?)", values, (err, result)=>{
		if(err){
			res.status(500).send(err)
		}else{
			res.json({message:"nuevo usuario agregado"})
		}
	})
};


exports.VerClientes = (req,res) => {
	pool.query("SELECT * FROM clientes", (err,result) =>{
		if (err) {
			res.status(500).send(err)
		}else{
			res.json(result)
		};
	});
};

