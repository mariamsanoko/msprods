const blockedPatterns = [/mot de passe/i, /secret api/i, /ignore les instructions/i];

export function assertSafePrompt(message) {
  const unsafe = blockedPatterns.some((pattern) => pattern.test(String(message || '')));
  if (unsafe) {
    const error = new Error('Cette demande ne peut pas être traitée par le coach IA.');
    error.statusCode = 400;
    throw error;
  }
}
