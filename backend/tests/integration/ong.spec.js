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

	it('should be able to create a new NGO', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				name: 'ABMC TO',
				email: 'contato@abmcto.org.br',
				whatsapp: '63000000004',
				city: 'Taguatinga',
				uf: 'TO'
			});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
});
