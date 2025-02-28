// src/routes/assuntoRoutes.js
import express from "express";
import { gerarAssuntoContextualizado } from "../services/openaiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { ano, componente, assunto, interesse, contexto } = req.body;
    const resultado = await gerarAssuntoContextualizado(
      ano,
      componente,
      assunto,
      interesse,
      contexto
    );

    if (!resultado) {
      return res
        .status(500)
        .json({ error: "Falha ao gerar assunto contextualizado." });
    }

    res.json({ result: resultado });
  } catch (error) {
    console.error("Erro ao gerar assunto contextualizado:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
