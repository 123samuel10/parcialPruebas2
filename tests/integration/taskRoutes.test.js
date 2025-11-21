const request = require("supertest");
const app = require("../../src/app");

describe("Rutas de Tareas", () => {
  test("Listar tareas por usuario (GET /tasks/:userId)", async () => {
    const res = await request(app).get("/tasks/1");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
