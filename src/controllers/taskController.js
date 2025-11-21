const taskService = require("../services/taskService");

module.exports = {
  async create(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const tasks = await taskService.listTasks(req.params.userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      await taskService.updateStatus(req.params.id, req.body.is_completed);
      res.json({ message: "Estado actualizado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await taskService.deleteTask(req.params.id);
      res.json({ message: "Tarea eliminada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
