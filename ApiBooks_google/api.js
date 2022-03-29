const axios =require('axios');

const api = axios.create({
    baseUrl: "https://www.googleapis.com/books/v1"
})

module.exports = api;