import axios from "axios";

// LINK do Codespace no backend, ex.:
const baseURL = "http://localhost:5000";

const api = axios.create({ baseURL });

// Autenticação
export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function registerUser(email: string, password: string) {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
}

// Plano de aula
export async function gerarPlanoAula(formData: any) {
  const { data } = await api.post("/plano_aula", formData);
  return data.result;
}

// Questões
export async function gerarQuestoes(formData: any) {
  const { data } = await api.post("/questoes", formData);
  return data.result;
}

// Assunto Contextualizado
export async function gerarAssuntoContextualizado(formData: any) {
  const { data } = await api.post("/assunto_contextualizado", formData);
  return data.result;
}

export default api;
