export function buildCoachPrompt(message, context = '') {
  return `Tu es le coach IA MS Prods. Réponds en français, sois clair, utile et honnête. Utilise le contexte disponible sans inventer.\n\nContexte:\n${context}\n\nQuestion:\n${message}`;
}
