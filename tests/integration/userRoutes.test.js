const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/db");

describe("Rutas de Usuario", () => {

  beforeAll(async () => {
    // Limpiar primero tareas y luego usuarios
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");
  });

  test("Registrar usuario (POST /users/register)", async () => {
    const uniqueEmail = `juan_${Date.now()}@test.com`;
    const res = await request(app).post("/users/register").send({
      name: "Juan",
      email: uniqueEmail,
      password: "123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user_id");
  });
});
