const userModel = require("../models/userModel");

module.exports = {
  async createUser(data) {
    const id = await userModel.create(data.name, data.email, data.password);
    return { id, ...data };
  }
};
