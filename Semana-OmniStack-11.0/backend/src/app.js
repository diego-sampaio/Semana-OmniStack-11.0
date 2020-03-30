const express = require('express');
const cors = require('cors'); /* Módulo de segurança. Controla quem pode acessar a aplicação */
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); /* Antes das requisições (deve vir antes das rotas) vai no corpo da requisição e converte o JSON em um objeto do JavaScript */
app.use(routes);
app.use(errors());

module.exports = app;