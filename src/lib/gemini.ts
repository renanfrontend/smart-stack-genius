
// Gemini API Integration

// API Key for Gemini AI
const GEMINI_API_KEY = "AIzaSyCAQxBupEHX4w0w92-_7Q70XPCLedbC1X0"; // Corrigindo a chave API adicionando um caractere no final
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    index: number;
  }>;
};

export const generateTextWithGemini = async (prompt: string, model = "gemini-1.0-pro"): Promise<string> => {
  try {
    console.log("Enviando requisição para Gemini API com o prompt:", prompt);
    
    const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API Gemini:", errorData);
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "Não foi possível gerar uma resposta. Tente novamente.";
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Desculpe, estou enfrentando problemas técnicos no momento. Por favor, tente novamente mais tarde.";
  }
};

export const generateImagePrompt = async (description: string): Promise<string> => {
  const prompt = `Crie uma descrição detalhada para gerar uma imagem de: ${description}. 
  A descrição deve ser técnica e detalhada para um gerador de imagens.`;
  
  return generateTextWithGemini(prompt);
};

export const generateMusicPrompt = async (description: string): Promise<string> => {
  const prompt = `Crie uma descrição detalhada para uma composição musical baseada em: ${description}.
  Inclua detalhes sobre ritmo, instrumentos, andamento e estilo.`;
  
  return generateTextWithGemini(prompt);
};
