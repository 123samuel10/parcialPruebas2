const taskModel = require("../models/taskModel");

module.exports = {
  async createTask(data) {
    const id = await taskModel.create(
      data.title,
      data.description,
      data.user_id
    );
    return { id, ...data };
  },

  async listTasks(userId) {
    return taskModel.getByUser(userId);
  },

  async updateStatus(id, isCompleted) {
    await taskModel.updateStatus(id, isCompleted);
  },

  async deleteTask(id) {
    await taskModel.delete(id);
  }
};
