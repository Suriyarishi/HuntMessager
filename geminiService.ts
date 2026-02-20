
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFastResponse = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text || "No response";
};

export const getThinkingResponse = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text || "No response";
};

export const searchGrounding = async (query: string): Promise<{ text: string, links: { title: string, uri: string }[] }> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || "No response";
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const links = chunks
    .filter((c: any) => c.web)
    .map((c: any) => ({
      title: c.web.title || "Source",
      uri: c.web.uri
    }));

  return { text, links };
};

export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K"): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to generate image");
};

export const editImageWithAI = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return "";
};
