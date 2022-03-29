const express = require("express");

const app = express();

app.use(express.json())

app.get('/',(request, response) => {
    return response.json({
        resposta: "rodando os Livros"
    });
});
app.get('/:id',(request, response) => {
    return response.json({
        id: Number(request.params.id)
    });
});

app.listen(3002,()=>console.log('Api Books_google na port:3002'));