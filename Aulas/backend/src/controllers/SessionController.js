const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body; /* Recupera o 'id' da ONG do corpo da requisição enviado no JSON */

    const ong = await connection('ongs')
     .where('id', id) /* Verifica se o 'id' da ONG da tabela 'ongs' é o mesmo enviado no JSON via corpo da requisição */
     .select('name') /* Retorna somente o nome da ONG */
     .first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  }
}