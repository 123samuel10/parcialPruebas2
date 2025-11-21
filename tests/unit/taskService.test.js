const taskService = require("../../src/services/taskService");
const userService = require("../../src/services/userService");
const pool = require("../../src/config/db");

describe("Task Service", () => {

  beforeAll(async () => {
    // Limpiar tablas antes de los tests
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");
  });

  test("debería crear una tarea correctamente", async () => {
    // 1️⃣ Crear un usuario primero
    const uniqueEmail = `usuario_task_${Date.now()}@test.com`;
    const user = await userService.createUser({
      name: "Usuario Test",
      email: uniqueEmail,
      password: "123"
    });

    // 2️⃣ Crear la tarea con el user_id correcto
    const data = {
      title: "Tarea test",
      description: "Descripción test",
      user_id: user.id
    };

    const task = await taskService.createTask(data);

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Tarea test");
  });
});
