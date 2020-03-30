const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const {page = 1} = request.query; /* Recupera o Query Params enviado após o '?', 'page', quando existe, senão, utiliza por padrão o valor 1 */

    const [count] = await connection('incidents').count(); /* Como o retorno é array, o 'count' fica entre [] para trazer somente a primeira posição */

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') /* Faz o join com a tabela 'ongs' através do 'id' relacionado com o 'ong_id' da tabela 'incidents' */
      .limit(5) /* Limita a quantidade de registros de incidentes a 5 por página */
      .offset((page - 1) * 5) /* Paginação de 5 em 5 */
      .select([
        'incidents.*', /* Retorna todos os dados dos incidentes */
        'ongs.name', /* Retorna das ONG's somente os campos listados abaixo */
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']); /* Retorna para o front-end, no cabeçalho da resposta da requisição, através do 'X-Total-Count', o total geral de incidentes */

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body; /* Dados enviados no corpo da requisição pelo JSON para cadastro do incidente */
    const ong_id = request.headers.authorization; /* 'ong_id' deve vir do 'headers' (cabeçalho) da requisição, pois ele guarda a informação do contexto da requisição, usado em autenticação, localização, etc. Dessa forma, a aplicação entende que a ONG X é quem está criando o incidente */

    const [id] = await connection('incidents').insert({ /* O 'id' dentro da [] desestrutura e retorna somente o 'id' do incidente */
      title,
      description,
      value,
      ong_id,
    });

    return response.json({id});
  },

  async delete(request, response) {
    const { id } = request.params; /* Recupera o 'id' passado como parâmetro na requisição (/incidents/1) que está relacionado na rota (routes.delete('/incidents/:id') */
    const ong_id = request.headers.authorization; /* Recupera o 'ong_id' para garantir que o incidente está relacionado a essa ONG e não a outra */

    const incident = await connection('incidents')
      .where('id', id) /* Verifica se o 'id' do incidente da tabela 'incidents' é o mesmo enviado no parâmetro da requisição '/incidents/1' */
      .select('ong_id')
      .first(); /* Como retorna somente um registro, pois o ID é único, utiliza-se o '.first()', para não exigir muito do BD */

    if (incident.ong_id /* 'ong_id' da tabela 'incidents' */ !== ong_id /* 'ong_id' do 'headers' (autenticado) */) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents')
      .where('id', id) /* Verifica se o 'id' do incidente da tabela 'incidents' é o mesmo enviado no parâmetro da requisição '/incidents/1' */
      .delete();

    return response.status(204).send(); /* Status 204: Deu sucesso, mas retorna resposta sem conteúdo */
  }
}