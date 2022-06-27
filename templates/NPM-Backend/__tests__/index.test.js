const request = require('supertest');
const app = require('../app');

describe('GET /api/healthcheck', () => {
	it('should return a status of 200 and a message of API is running', () => {
		return request(app)
			.get('/api/healthcheck')
			.expect(200)
			.then((res) => {
				expect(res.body.message).toEqual('API is running');
			});
	});
});
