
import { GoogleGenAI, Type } from "@google/genai";
import { FileData, MVPData } from "../types.js";

export const convertRepoToMVP = async (files: FileData[]): Promise<MVPData> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');
  const ai = new GoogleGenAI({ apiKey });
  
  const fileSummary = files
    .map(f => `FILE: ${f.name}\nCONTENT PREVIEW:\n${f.content.substring(0, 1000)}`)
    .join('\n\n---\n\n');

  const prompt = `
    You are a senior product engineer and venture architect. Analyze this repository (it might be incomplete) and conceptualize a polished MVP version.
    
    TASK:
    1. Identify the core value proposition.
    2. Extract the actual tech stack used and suggest missing pieces. For each technology, provide its name and a brief (1 sentence) description of its specific role in this product's architecture.
    3. Generate a structured roadmap for launch.
    4. Propose a specific MVP version number based on completeness.
    5. Estimate a potential market valuation (Seed/Pre-seed stage) based on the technical complexity and market potential.
       - Provide valuation in USD.
       - Provide valuation in Ringgit Malaysia (MYR) using an approximate exchange rate of 1 USD = 4.70 MYR.
    
    INPUT REPO FILES:
    ${fileSummary}
    
    Return the response strictly in the specified JSON format. Ensure valuations are reasonable numbers (not strings).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          overview: { type: Type.STRING },
          techStack: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING }
              },
              required: ['name', 'role']
            } 
          },
          features: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          roadmap: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          suggestedMvpVersion: { type: Type.STRING },
          valuationUSD: { type: Type.NUMBER },
          valuationMYR: { type: Type.NUMBER }
        },
        required: ['projectName', 'tagline', 'overview', 'techStack', 'features', 'roadmap', 'suggestedMvpVersion', 'valuationUSD', 'valuationMYR']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI failed to generate content");
  
  return JSON.parse(text);
};
