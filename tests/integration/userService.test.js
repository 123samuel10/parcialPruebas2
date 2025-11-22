const userService = require("../../src/services/userService");

describe("User Service", () => {
  test("debería crear un usuario correctamente", async () => {
    const data = {
      name: "Samuel",
      email: "samuel@test.com",
      password: "123"
    };

    const result = await userService.createUser(data);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Samuel");
    expect(result.email).toBe("samuel@test.com");
  });
});
