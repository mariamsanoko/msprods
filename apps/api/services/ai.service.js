import { captureLead, formatContextForPrompt, searchKnowledgeBase } from './airtable.service.js';
import { recommendPath } from './recommendation.service.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';

const SYSTEM_PROMPT = `Tu es "MS Prods AI Brain Assistant".

Règles strictes :
- Tu utilises UNIQUEMENT les données Airtable fournies dans le contexte pour les réponses factuelles.
- Tu aides les utilisateurs à choisir le meilleur parcours de formation MS Prods.
- Tu es commercial mais utile, clair et honnête.
- Tu parles français par défaut.
- Si une donnée manque, tu poses une question de clarification au lieu d'inventer.
- Tu n'inventes jamais de formations, de prix, de durées, de promotions ou de garanties.
- Tu restes concis.
- Tu recommandes toujours une prochaine étape.
- Tu suggères une formation MS Prods pertinente seulement si elle existe dans le contexte Airtable.
- Si le contexte ne contient aucune formation pertinente, demande l'objectif, le niveau et le budget.`;

function extractEmail(text) {
  return String(text || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
}

function sanitizeHistory(history = []) {
  return history
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && item.content)
    .slice(-8)
    .map((item) => ({ role: item.role, content: String(item.content).slice(0, 1200) }));
}

async function callOpenAI({ message, history, context }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI configuration is missing. Set OPENAI_API_KEY.');

  const input = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'developer', content: `Contexte Airtable autorisé pour répondre :\n\n${context}` },
    ...sanitizeHistory(history),
    { role: 'user', content: message }
  ];

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input,
      temperature: 0.2,
      max_output_tokens: 550
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  return data.output_text || data.output?.flatMap((item) => item.content || []).map((part) => part.text || '').join('\n').trim();
}

export async function answerChat({ message, history = [], name = '' }) {
  const cleanedMessage = String(message || '').trim();
  if (!cleanedMessage) {
    const error = new Error('Message is required.');
    error.statusCode = 400;
    throw error;
  }

  const airtableResults = await searchKnowledgeBase(cleanedMessage, { limitPerTable: 3 });
  const recommendedPath = recommendPath(cleanedMessage, airtableResults);
  const context = formatContextForPrompt(airtableResults, recommendedPath);
  const answer = await callOpenAI({ message: cleanedMessage, history, context });

  const email = extractEmail(cleanedMessage);
  let lead = { captured: false };
  if (email) {
    try {
      lead = await captureLead({ email, name, message: cleanedMessage, recommendedPath });
    } catch (error) {
      lead = { captured: false, reason: error.message };
    }
  }

  return { answer, recommendedPath, context: airtableResults, lead };
}
