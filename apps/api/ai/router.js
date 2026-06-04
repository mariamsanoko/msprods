import { answerChat } from '../services/ai.service.js';
import { applySafetyLayer } from './safety-layer.js';

export async function routeAiMessage(input) {
  const result = await answerChat(input);
  return { ...result, answer: applySafetyLayer(result.answer) };
}
