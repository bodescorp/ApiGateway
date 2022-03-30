require('dotenv').config()
const express = require("express");
const api = require("./api")
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

// app.get('/',(request, response) => {
//     return response.json({
//         resposta: "rodando os Livros"
//     });
// });
app.get('/books',async (request, response) => {
    const {q} = request.query;
    try {
        const {data} = await api.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.KEY}`);

        return response.json(data);
    } catch (error) {
        return response.json({error});
    }
});

app.listen(3002,()=>console.log('Api Books_google na port:3002'));