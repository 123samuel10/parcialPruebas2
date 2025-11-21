const request = require("supertest");
const app = require("../../src/app");

describe("Flujo E2E completo", () => {
  test("Registrar usuario, crear tarea y listar", async () => {

    // 1. Registrar usuario
    const user = await request(app).post("/users/register").send({
      name: "Pedro",
      email: "pedro@test.com",
      password: "abc"
    });

    expect(user.status).toBe(200);
    const userId = user.body.user_id;

    // 2. Crear tarea
    const task = await request(app).post("/tasks").send({
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
