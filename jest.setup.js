const pool = require('./src/config/db');

// Cerrar el pool después de todas las pruebas
afterAll(async () => {
  await pool.end();
});
