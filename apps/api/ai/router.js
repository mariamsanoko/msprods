import { assertSafePrompt } from './safety-layer.js';
import { buildCoachPrompt } from './prompt-engine.js';

export function prepareAiRequest(message, context) {
  assertSafePrompt(message);
  return buildCoachPrompt(message, context);
}
