const express = require("express");
const cors = require("cors");

const routes = require("./src/Routes/Routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(cors());

app.use('/api/',routes());


app.listen(PORT, () => {
    console.log("Corriendo en el puerto", PORT)
});






