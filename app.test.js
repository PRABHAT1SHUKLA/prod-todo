const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-db');
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('GET /todos returns empty array initially', async () => {
  const res = await request(app).get('/todos');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
