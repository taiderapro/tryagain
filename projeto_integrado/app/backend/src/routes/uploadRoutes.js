import express from "express";
import multer from "multer";
import { processarArquivos } from "../services/fileProcessingService.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        const conteudo = await processarArquivos(file.buffer, file.originalname);
        if (!conteudo) {
            return res.status(400).json({ error: "Falha ao processar arquivo." });
        }

        res.json({ conteudo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
