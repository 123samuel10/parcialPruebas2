const request = require("supertest");
const app = require("../../src/app");

describe("Rutas de Usuario", () => {
  test("Registrar usuario (POST /users/register)", async () => {
    const res = await request(app).post("/users/register").send({
      name: "Juan",
      email: "juan@test.com",
      password: "123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user_id");
  });
});
