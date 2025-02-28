// src/services/openaiService.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function gerarQuestoes(
  ano,
  componente,
  assunto,
  dificuldade,
  numero_questoes,
  tipo,
  contexto
) {
  const prompt = `
Crie ${numero_questoes} questões do tipo ${tipo} para:
- Ano: ${ano}
- Componente: ${componente}
- Assunto: ${assunto || "N/A"}
- Dificuldade: ${dificuldade}
${contexto ? `\nContexto: ${contexto}\n` : ""}
`;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao gerar questões:", error);
    throw error;
  }
}

export async function gerarAssuntoContextualizado(
  ano,
  componente,
  assunto,
  interesse,
  contexto
) {
  const prompt = `
Crie um assunto contextualizado para:
- Ano: ${ano}
- Componente: ${componente}
- Assunto: ${assunto || "N/A"}
- Interesse: ${interesse || "N/A"}
${contexto ? `\nContexto: ${contexto}\n` : ""}
`;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao gerar assunto contextualizado:", error);
    throw error;
  }
}

export async function gerarPlanoAula(
    ano,
    componente,
    duracao,
    metodologia,
    caracteristicas,
    assunto,
    contexto
  ) {
    // Exemplo de uso da API
    const prompt = `
  Crie um plano de aula para:
  - Ano: ${ano}
  - Componente: ${componente}
  - Duração: ${duracao} minutos
  - Metodologia: ${metodologia}
  - Assunto: ${assunto}
  - Características: ${caracteristicas}
  - Contexto: ${contexto}
  `;
  
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Erro ao gerar plano de aula:", error);
      throw error;
    }
  }