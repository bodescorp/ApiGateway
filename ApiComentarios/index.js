const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json())

app.get('/',(request, response) => {
    return response.json({
        resposta: "rodando os comentarios"
    });
});

app.listen(3001,()=>console.log('Api Comentario na port:3001'));