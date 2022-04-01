require('dotenv').config()
const express = require("express");
const api = require("./api")
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/books/:idBook',async (request, response) => {
    const {idBook} = request.params;
    try {
        const {data} = await api.get(`https://www.googleapis.com/books/v1/volumes/${idBook}?key=${process.env.KEY}`);

        return response.json(data);
    } catch (error) {
        return response.json({error});
    }
});


app.post('/books',async (request, response) => {
    const {nameBook} = request.body;
    const {pages = 0} = request.query;
    try {
        const {data} = await api.get(`https://www.googleapis.com/books/v1/volumes?q=${nameBook}&startIndex=${pages}&key=${process.env.KEY}`);

        return response.json(data);
    } catch (error) {
        return response.json({error});
    }
});

app.listen(3002,()=>console.log('Api Books_google na port:3002'));