const taskService = require("../../src/services/taskService");

describe("Task Service", () => {
  test("debería crear una tarea correctamente", async () => {
    const data = {
      title: "Tarea test",
      description: "Descripción test",
      user_id: 1
    };

    const task = await taskService.createTask(data);

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Tarea test");
  });
});
