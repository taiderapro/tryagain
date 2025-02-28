// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
import planoAulaRoutes from "./src/routes/planoAulaRoutes.js";
import questoesRoutes from "./src/routes/questoesRoutes.js";
import assuntoRoutes from "./src/routes/assuntoRoutes.js";

dotenv.config();

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sirva os arquivos estáticos do front-end (build copiado para public)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/plano_aula", planoAulaRoutes);
app.use("/api/questoes", questoesRoutes);
app.use("/api/assunto_contextualizado", assuntoRoutes);

// Rota catch-all para retornar o index.html (suporta client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
