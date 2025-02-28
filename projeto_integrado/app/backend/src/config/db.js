// app/backend/src/config/db.js
import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

const pool = new sql.ConnectionPool(config);

pool.on('error', (err) => {
  console.error("Pool error:", err);
});

const poolConnect = pool.connect()
  .then(() => console.log("Conexão com SQL Server bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao SQL Server:", err));

export { pool, sql };
