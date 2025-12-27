
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FileData, MVPData } from "../types.js";

export const convertRepoToMVP = async (files: FileData[]): Promise<MVPData> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');
  const genAI = new GoogleGenerativeAI(apiKey);

  const fileSummary = files
    .map(f => `FILE: ${f.name}\nCONTENT PREVIEW:\n${f.content.substring(0, 1000)}`)
    .join('\n\n---\n\n');

const prompt = `
  IDENTITY: You are a senior product engineer and venture architect with expertise in startup evaluation, technical architecture, and market analysis.
  PLATFORM CONTEXT: You are operating within the "KD Synthesizer" platform for project analysis.
  CRITICAL CONSTRAINT: The platform name is "KD". THE PROJECT YOU ARE ANALYZING IS NOT CALLED "KD" OR "KD SYNTHESIZER". Avoid any confusion between the platform and the project.

  TASK OVERVIEW:
  Analyze the provided repository files to extract key insights about the project. Use logical reasoning and, where necessary, tools like web_search or browse_page for external data (e.g., market trends, comparable valuations, or latest tech standards). Ensure all outputs are factual, concise, and professional.

  SPECIFIC TASKS:
  1. Determine the ACTUAL project name by scanning files like package.json (e.g., "name" field), README.md (e.g., top headers or titles), or main source files (e.g., app entry points or config files).
     - IMPORTANT: ABSOLUTELY DO NOT name the project "KD" or "KD Synthesizer".
     - If no clear name is found in the code, use this provided name hint as a fallback: "${
       nameHint || "Untitled Project"
     }".
  2. Identify the core value proposition (what problem it solves and for whom) and create a catchy, memorable tagline specific to this project.
  3. Extract the actual tech stack used in the project based on the files (e.g., dependencies, imports, configurations). List each technology with its name and a brief description of its specific role in the project.
     - Then, suggest 2-4 missing or complementary pieces based on the latest industry standards (as of the current date). For each suggestion, provide the name, a brief description of its potential role, and why it would benefit the project.
  4. Generate a 2-3 sentence "AI Intelligence Report": Provide a high-level architectural critique (strengths and weaknesses), followed by a strategic recommendation for improvement or scaling.
  5. Generate a structured roadmap for launch, formatted as a numbered list of 5-7 key milestones. Each milestone should include a title, brief description, estimated timeline (e.g., "Weeks 1-2"), and dependencies if applicable.
  6. Propose a specific MVP version number (e.g., "0.1.0") based on the project's current completeness. Justify briefly why this version fits (e.g., core features present but lacking polish).
  7. First, use web_search (with queries targeting Google and DuckDuckGo, e.g., via site: operators if needed) to deeply search for the project name and determine if it is already deployed (e.g., live website, app store listing, public announcements). If yes, set deployment status to "deployed project"; if no, "still in development".
     - Then, estimate a potential market valuation at the Seed/Pre-seed stage. Use web_search to fetch real latest world data on average, minimum, and maximum valuations of comparable startups (based on tech stack, value prop, and market). Gather data for the last 3 years, 5 years, 10 years, and 15 years periods.
     - Use mathematical equations and algorithms for the best output: Compute the estimated valuation as a weighted average of the period averages, with weights favoring recent data (e.g., weights: 3y=0.4, 5y=0.3, 10y=0.2, 15y=0.1). Formula: valuation = (avg_3y * 0.4 + avg_5y * 0.3 + avg_10y * 0.2 + avg_15y * 0.1). If needed, use code_execution to perform calculations.
     - Adjust based on technical complexity, uniqueness, market potential, and deployment status (e.g., higher if deployed).
     - Provide valuations in both USD and MYR (use web_search or code_execution for current exchange rates).
     - Include a brief justification referencing key factors, data sources, min/max ranges per period, and the calculation.
  8. Generate a "Valuation Tutorial Guide": A step-by-step explanation of the valuation process, including how searches were conducted, data gathered, mathematical equations/algorithms applied, and how deployment status was determined. Format as a concise tutorial with numbered steps.

  INPUT REPO FILES:
  ${fileSummary}

  OUTPUT FORMAT:
  Return the response strictly as valid JSON. Do not include any additional text, explanations, or markdown outside the JSON. If tools are used (e.g., web_search for market data or tech trends), incorporate the results into the final JSON without breaking the structure. The JSON schema must match exactly:

  {
    "projectName": "string",
    "valueProposition": "string",
    "tagline": "string",
    "techStack": {
      "used": [
        {
          "name": "string",
          "description": "string"
        }
      ],
      "suggested": [
        {
          "name": "string",
          "description": "string",
          "benefit": "string"
        }
      ]
    },
    "intelligenceReport": "string",
    "roadmap": [
      {
        "milestone": "string",
        "description": "string",
        "timeline": "string",
        "dependencies": "string (optional)"
      }
    ],
    "mvpVersion": "string",
    "deploymentStatus": "string",
    "valuation": {
      "usd": number,
      "myr": number,
      "justification": "string"
    },
    "valuationTutorial": "string"
  }
`;

  // Try models in order of preference
  const modelsToTry = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro', 'gemini-1.0-flash', 'gemini-1.5-turbo', 'gemini-1.0-turbo', 'gemini 3 flash preview', 'gemini 3 pro preview', 'gemini 2.5 flash', 'gemini 2.5 pro', 'gemini 2.5 turbo'];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      if (!text) throw new Error("AI failed to generate content");

      return JSON.parse(text);
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error);
      // Continue to next model
    }
  }

  throw new Error('All attempted Gemini models failed');
};
