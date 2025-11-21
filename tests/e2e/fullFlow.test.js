const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/db"); // conexión correcta

describe("Flujo E2E completo", () => {

  // Limpiar tablas antes de correr los tests
  beforeAll(async () => {
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");
  });

  test("Registrar usuario, crear tarea y listar", async () => {

    // 1. Registrar usuario con email único
    const uniqueEmail = `pedro_${Date.now()}@test.com`;

    const user = await request(app)
      .post("/users/register")
      .send({
        name: "Pedro",
        email: uniqueEmail,
        password: "abc"
      });

    expect(user.status).toBe(200);
    const userId = user.body.user_id;

    // 2. Crear tarea
    const task = await request(app)
      .post("/tasks")
      .send({
        title: "Tarea E2E",
        description: "Probando flujo completo",
        user_id: userId
      });

    expect(task.status).toBe(201);

    // 3. Listar tareas del usuario
    const list = await request(app).get(`/tasks/${userId}`);

    expect(list.status).toBe(200);
    expect(list.body.length).toBeGreaterThan(0);
  });
});
