const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ong_id', ong_id) /* Compara o 'ong_id' da ONG relacionada na tabela 'incidents' com o 'ong_id' do 'headers' (autenticada) */
      .select('*');

    return response.json(incidents);
  }
};