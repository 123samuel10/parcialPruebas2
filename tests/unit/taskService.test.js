const taskService = require("../../src/services/taskService");
const userService = require("../../src/services/userService");
const pool = require("../../src/config/db");

describe("Task Service", () => {

  let userId;

  beforeAll(async () => {
    // Limpiar tablas primero
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");

    // Crear un usuario para asociar las tareas
    const uniqueEmail = `pedro_${Date.now()}@test.com`;
    const user = await userService.createUser({
      name: "Pedro",
      email: uniqueEmail,
      password: "abc"
    });
    userId = user.id;
  });

  test("debería crear una tarea correctamente", async () => {
    const data = {
      title: "Tarea test",
      description: "Descripción test",
      user_id: userId
    };

    const task = await taskService.createTask(data);

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Tarea test");
  });
});
