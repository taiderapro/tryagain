import { readFile } from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import xlsx from "xlsx";

export async function processarArquivos(fileBuffer, filename) {
    try {
        let texto = "";

        if (filename.endsWith(".docx")) {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            texto = result.value;
        } else if (filename.endsWith(".txt")) {
            texto = fileBuffer.toString("utf-8");
        } else if (filename.endsWith(".pdf")) {
            const result = await pdfParse(fileBuffer);
            texto = result.text;
        } else if (filename.endsWith(".csv") || filename.endsWith(".xlsx")) {
            const workbook = xlsx.read(fileBuffer, { type: "buffer" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            texto = xlsx.utils.sheet_to_csv(sheet);
        } else {
            return null;
        }

        return texto;
    } catch (error) {
        console.error("Erro ao processar arquivo:", error);
        return null;
    }
}
