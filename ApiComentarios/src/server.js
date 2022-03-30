const express = require("express");
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json())

app.use(routes);



app.listen(3001,()=>console.log('Api Comentario na port:3001'));