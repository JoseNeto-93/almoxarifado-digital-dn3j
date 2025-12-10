import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// System instruction for the warehouse expert persona
const SYSTEM_INSTRUCTION = `
Você é um especialista em logística, organização de almoxarifado e gestão de estoque (Supply Chain).
Seu objetivo é ajudar funcionários a organizar melhor o almoxarifado, dar dicas de segurança (EPIs), 
sugerir layouts de prateleiras, métodos de etiquetagem (5S, Kanban) e uso eficiente de ferramentas como Excel/Word para controle.
Seja prático, direto e use formatação clara.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Erro: Chave de API não configurada. Por favor, verifique suas variáveis de ambiente.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for speed and efficiency in chat
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Desculpe, não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao conectar com o assistente inteligente.";
  }
};