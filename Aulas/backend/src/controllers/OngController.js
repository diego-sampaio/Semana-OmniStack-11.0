const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    //const data = request.body; /* A variável 'data' armazena todos os dados em um array */
    const { name, email, whatsapp, city, uf } = request.body; /* A {} desestrutura e armazena cada um dos dados em uma variável, assim facilita na manipulação dos dados */

    const id = crypto.randomBytes(4).toString('HEX'); /* Gera 4 bytes de caracteres hexadecimais aleatórios */

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({id}); /* O 'id' entre a {} faz com que a informação 'id' apareça na resposta para o front-end saber com qual informação ele vai trabalhar */

    /**
     * Como o 'insert' demora para ser executado, é utilizado o método async/await.
     * Quando o código chegar no 'insert' ele vai dar um 'await' (aguardar) até 'insert' finalizar, para só então continuar e retornar os dados.
     */
  }
};