const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const httpproxy = require('express-http-proxy');
const {resolve} = require('path');
const {readFileSync} = require('fs');
const yaml = require('js-yaml');
const cors = require('cors');


const app = express();

const pathFile = resolve(process.cwd(), 'config.yml');

const readConfig = readFileSync(pathFile, {encoding: 'utf8'});

const {services} = yaml.load(readConfig,{json: true});

app.use(cors());

app.use(express.json());

app.use(logger('dev'));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));

// app.get('/', (request, response) => {
//     return response.json({
//         resposta: "rodando o Gateway"
//     });
// });

services.forEach(({name, url}) => {
    app.use(`/${name}`, httpproxy(`${url}`,{timeout: 3000}));
});



app.listen(3333, () => console.log('Api Gateway na port:3333'));