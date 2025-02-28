// src/routes/questoesRoutes.js
import express from "express";
import { gerarQuestoes } from "../services/openaiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      ano,
      componente,
      assunto,
      dificuldade,
      numero_questoes,
      tipo,
      contexto,
    } = req.body;

    const resultado = await gerarQuestoes(
      ano,
      componente,
      assunto,
      dificuldade,
      numero_questoes,
      tipo,
      contexto
    );

    if (!resultado) {
      return res.status(500).json({ error: "Falha ao gerar questões." });
    }

    res.json({ result: resultado });
  } catch (error) {
    console.error("Erro ao gerar questões:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
