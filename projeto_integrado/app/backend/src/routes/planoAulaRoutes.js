import express from "express";
import { gerarPlanoAula } from "../services/openaiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { ano, componente, assunto, duracao, metodologia, caracteristicas, contexto } = req.body;
        const resultado = await gerarPlanoAula(ano, componente, duracao, metodologia, caracteristicas, assunto, contexto);

        if (!resultado) {
            return res.status(500).json({ error: "Falha ao gerar plano de aula." });
        }

        res.json({ result: resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
