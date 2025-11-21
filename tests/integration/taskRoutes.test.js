const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/db");
const userService = require("../../src/services/userService");

describe("Rutas de Tareas", () => {

  let userId;

  beforeAll(async () => {
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");

    // Crear un usuario para asociar tareas
    const uniqueEmail = `pedro2_${Date.now()}@test.com`;
    const user = await userService.createUser({
      name: "Pedro2",
      email: uniqueEmail,
      password: "abc"
    });
    userId = user.id;

    // Crear una tarea inicial
    await request(app).post("/tasks").send({
      title: "Tarea inicial",
      description: "Descripción inicial",
      user_id: userId
    });
  });

  test("Listar tareas por usuario (GET /tasks/:userId)", async () => {
    const res = await request(app).get(`/tasks/${userId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
