import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
    'X-Title': 'ValidifyAI',
  },
});

const SYSTEM_PROMPT = `You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the following fields:
- problem: A concise summary of the problem being solved (2-3 sentences)
- customer: A detailed customer persona description (2-3 sentences)  
- market: A market overview including size and growth potential (2-3 sentences)
- competitor: Exactly 3 competitors, each with "name" and "differentiation" (one-line each)
- tech_stack: An array of 4-6 practical technologies for MVP
- risk_level: One of exactly "Low", "Medium", or "High"
- profitability_score: An integer between 0 and 100
- justification: A brief explanation of the risk level and profitability score (2-3 sentences)

Rules:
- Keep answers concise and realistic
- competitor must be an array of exactly 3 objects with "name" and "differentiation" keys
- tech_stack must be an array of strings
- profitability_score must be an integer between 0-100
- Return ONLY valid JSON, no markdown, no code blocks, no extra text`;

export const analyzeIdea = async (title, description) => {
  const userMessage = JSON.stringify({ title, description });

  const response = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  });

  const rawContent = response.choices[0].message.content;
  const parsed = JSON.parse(rawContent);

  // Validate and normalize the response
  const report = {
    problem: parsed.problem || '',
    customer: parsed.customer || '',
    market: parsed.market || '',
    competitor: Array.isArray(parsed.competitor)
      ? parsed.competitor.slice(0, 3).map(c => ({
          name: c.name || 'Unknown',
          differentiation: c.differentiation || '',
        }))
      : [],
    tech_stack: Array.isArray(parsed.tech_stack) ? parsed.tech_stack.slice(0, 6) : [],
    risk_level: ['Low', 'Medium', 'High'].includes(parsed.risk_level)
      ? parsed.risk_level
      : 'Medium',
    profitability_score: Math.min(100, Math.max(0, parseInt(parsed.profitability_score) || 50)),
    justification: parsed.justification || '',
  };

  return report;
};
