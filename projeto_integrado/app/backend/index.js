import express from "express";
import cors from "cors";
import assuntoRoutes from "./src/routes/assuntoRoutes.js";
import planoAulaRoutes from "./src/routes/planoAulaRoutes.js";
import questoesRoutes from "./src/routes/questoesRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/assunto_contextualizado", assuntoRoutes);
app.use("/api/plano_aula", planoAulaRoutes);
app.use("/api/questoes", questoesRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API Express.js rodando com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
