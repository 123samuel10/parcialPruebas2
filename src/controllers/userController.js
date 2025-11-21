const db = require("../config/db");

// REGISTRO
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.json({ message: "Usuario registrado", user_id: result.insertId });
  } catch (error) {
    console.error("🔥 ERROR REGISTER:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    res.json({ message: "Login exitoso", user: rows[0] });
  } catch (error) {
    console.error("🔥 ERROR LOGIN:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
