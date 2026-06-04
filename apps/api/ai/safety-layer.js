export function applySafetyLayer(answer) {
  return String(answer || '').replace(/\bgarantie\s+de\s+résultat\b/gi, 'accompagnement orienté résultat');
}
