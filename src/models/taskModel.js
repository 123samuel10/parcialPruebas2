const pool = require("../config/db");

module.exports = {
  async create(title, description, userId) {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId]
    );
    return result.insertId;
  },

  async getByUser(userId) {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ?",
      [userId]
    );
    return rows;
  },

  async updateStatus(id, isCompleted) {
    await pool.query(
      "UPDATE tasks SET is_completed = ? WHERE id = ?",
      [isCompleted, id]
    );
  },

  async delete(id) {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  }
};
