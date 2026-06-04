import { answerChat } from '../../../src/chat-service.js';
import { prepareAiRequest } from '../ai/router.js';

export async function askCoach({ message, history, name }) {
  prepareAiRequest(message, 'Contexte injecté par Airtable dans le service chat existant.');
  return answerChat({ message, history, name });
}
