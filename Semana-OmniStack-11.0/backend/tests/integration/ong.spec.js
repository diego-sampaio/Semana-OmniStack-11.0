const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong', async () => {
    const response = await request(app)
    .post('/ongs')
    /* .set('Authorization', 'id da ong') Caso for passar parâmetro do 'header' */
    .send({
      name: "APAD",
      email: "contato@apad.com.br",
      whatsapp: "62982507666",
      city: "Goiânia",
      uf: "GO"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});