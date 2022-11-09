const express = require('express')
const router = express();

const ClientesControllers = require("../Controllers/ClientControllers.js")
const PlanesControllers = require("../Controllers/PlanesControlles")


module.exports = () => {
    //Cliente
    router.post('/login', ClientesControllers.login);
    router.post('/registro', ClientesControllers.Registro);
    //Planes
    router.get('/planes', PlanesControllers.ver_planes);
    router.post('/planes/agregar',PlanesControllers.AgregarPlan);
   return router; 
}