const express = require('express');
const connection = require('./database/connection');

const routes = express.Router();

routes.post('/comentarios', async (request, response) => {
    const {id_book, comentario, user} = request.body;

    await connection('comentarios').insert({
        id_book, 
        comentario, 
        user
    })

    return response.json({message: "comentario efetuado com sucesso"});
});

routes.get('/comentarios/:id', async(request, response) =>{
    const {id} = request.params;
    const comentarios = await connection('comentarios').select('*').where("id_book",id);

    return response.json(comentarios)
})

module.exports = routes;