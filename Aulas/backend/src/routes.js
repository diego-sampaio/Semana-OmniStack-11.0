const express = require('express');
const { celebrate, Segments, Joi }= require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Rota / Recurso:
 * Rota: http://localhost:3333/ - O caminho que permite acessar a aplicação e que pode levar ao recurso.
 * Recurso: http://localhost:3333/users (/users') - No caso, acessando o recurso 'users' (usuários). Recurso pode estar associado, a uma tabela no BD.
 */

/**
 * Métodos HTTP:
 * GET: Buscar/listar uma informação do back-end. Ex.: lista todas as pessoas cadastradas no BD '.../users/', ou uma específica utilizando um parâmetro '.../users/1'
 * POST: Criar uma informação no back-end. Ex.: cadastra um usuário a partir de dados enviados via JSON: { "name": Diego, "age": "31" }
 * PUT: Alterar uma informação no back-end. Ex.: altera o cadastro de um usuário via JSON com base no ID passado como parâmetro. Rota: app.put('/users/:id), requisição: .../users/1
 * DELETE: Deletar uma informação no back-end. Ex.: deleta o cadastro de um usuário com base no ID passado como parâmetro. Rota: app.delete('/users/:id), requisição: .../users/1
 */

/**
 * Tipos de parâmetros:
 * Query Params: Parâmetros nomeados (filtros, paginação) enviados na rota após "?". http://localhost:3333/users?name=Diego&age=31 ou '?page=1'
 * Route Params: Parâmetros utilizados para identificar recursos. Ex.: quando a rota define que um ID deve ser enviado (app.get('/users/:id), deve-se enviar o ID na requisição: http://localhost:3333/users/1 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos. Ex.: ao enviar um JSON: { "name": Diego, "age": "31" }
 */


//Caso de exemplo dos comentários acima:
//app.get('/users', (request /* Guarda todos os dados que vem através da requisição do usuário */, response /* Retorna uma reposta para o usuário */) => {
//  const params = request.query; /* Ex.: recupera os dados de 'name' e 'age' da 'query' da requisição: .../users?name=Diego&age=31 */
//  const params = request.params; /* Recupera dados específicos do parâmetro passado na requisição (...users/1), desde que a rota (app.get('/users/:id') defina esse parâmetro (ID, no caso) */
//  const body = request.body; /* Ex.: recupera todos os dados vindos do 'corpo' da requisição via JSON: { "name": Diego, "age": "31" } */
//
//  return response.json({
//    evento: 'Semana OmniStack 11.0',
//    aluno: 'Diego Sampaio'
//  });
//});

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), OngController.create);
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), IncidentController.index);
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required().min(20).max(200),
      value: Joi.number().required(),
  })
}), IncidentController.create);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);

module.exports = routes;