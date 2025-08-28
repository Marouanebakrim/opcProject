const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/products');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('GET /api/products', () => {
  it('should return an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});