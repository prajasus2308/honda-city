import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, ensure this is handled securely. 
// For this demo, we assume the environment variable is injected by the bundler/runtime.

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Please set process.env.API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble connecting to the Honda mainframe.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted. Please try again later.";
  }
};