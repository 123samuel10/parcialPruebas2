const userService = require("../../src/services/userService");
const pool = require("../../src/config/db"); // conexión correcta a MySQL

describe("User Service", () => {

  beforeAll(async () => {
    // Borrar primero tareas y luego usuarios para evitar error de FK
    await pool.query("DELETE FROM tasks");
    await pool.query("DELETE FROM users");
  });

  test("debería crear un usuario correctamente", async () => {
    const uniqueEmail = `samuel_${Date.now()}@test.com`;
    const data = {
      name: "Samuel",
      email: uniqueEmail,
      password: "123"
    };

    const result = await userService.createUser(data);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Samuel");
    expect(result.email).toBe(uniqueEmail);
  });
});
