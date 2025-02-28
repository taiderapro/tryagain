// app/backend/src/controllers/authController.js
import { pool, sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Função para registrar usuário
export async function register(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Registrando usuário:", email);
    
    const existingUser = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM dbo.users WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      console.log("Usuário já existe:", email);
      return res.status(400).json({ success: false, message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("senha", sql.NVarChar, hashedPassword)
      .query("INSERT INTO dbo.users (email, senha) VALUES (@email, @senha)");

    console.log("Usuário registrado com sucesso:", email);
    res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Função para login
export async function login(req, res) {
  try {
    console.log("Login iniciado. Verificando conexão com o SQL Server...");
    console.log("Status da pool (connected):", pool.connected);
    
    const { email, password } = req.body;
    console.log("Dados recebidos para login:", email);
    
    if (!pool.connected) {
      console.log("Pool não conectado. Tentando reconectar...");
      await pool.connect();
      console.log("Pool reconectado. Status:", pool.connected);
    }

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM dbo.users WHERE email = @email");

    console.log("Resultado da query:", result);

    if (result.recordset.length === 0) {
      console.log("Nenhum usuário encontrado para o email:", email);
      return res.status(401).json({ success: false, message: "Usuário ou senha inválidos." });
    }

    const user = result.recordset[0];
    if (!user.senha) {
      console.log("Usuário encontrado sem campo de senha:", user);
      return res.status(500).json({ success: false, message: "Usuário sem campo de senha." });
    }

    const senhaValida = await bcrypt.compare(password, user.senha);
    if (!senhaValida) {
      console.log("Senha inválida para o usuário:", email);
      return res.status(401).json({ success: false, message: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "suaChaveSecreta",
      { expiresIn: "1h" }
    );

    console.log("Token gerado com sucesso:", token);
    res.json({ success: true, message: "Login bem-sucedido!", token });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}
