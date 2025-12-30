import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types";

// Helper to get a fresh AI instance with the current key
const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateCakeImage = async (prompt: string, size: ImageSize): Promise<string> => {
  const ai = getAIInstance();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `A hyper-realistic, appetizing artisanal cake: ${prompt}. Professional food photography, cozy cafe lighting.`,
          },
        ],
      },
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
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

export const askCocoaAssistant = async (query: string) => {
  const ai = getAIInstance();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: "You are a helpful, warm, and knowledgeable barista at Cocoa Cafe in Virar. You answer questions about coffee, cakes, our ingredients, and general cafe culture. Keep answers concise and friendly. If relevant, provide real-world info using search.",
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm having a little trouble brewing an answer right now.";
    
    // Extract grounding chunks if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({
        title: c.web.title,
        url: c.web.uri
      }));

    return { text, sources };
  } catch (error) {
    console.error("Search grounding failed:", error);
    throw error;
  }
};