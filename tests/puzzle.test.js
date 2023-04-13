const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const db_url = require('../configs/db.configs').url


/* Abrimos una nueva conexión a la BBDD antes de cada test */
beforeEach(async () => {
  await mongoose.connect(db_url);
});

/* Y la cerramos despues */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/getAll", () => {
  it("should return all puzzles", async () => {
    const res = await request(app).get("/api/getAll");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/getRandom/hard", () => {
  it("should return a single hard puzzle", async () => {
    const res = await request(app).get("/api/getRandom/hard");
    expect(res.statusCode).toBe(200);
    expect(res.body.level).toBe('hard');
    // expect(res.body.length).toBe(1);
  });
});
