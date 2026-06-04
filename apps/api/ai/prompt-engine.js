export function buildCoachPrompt({ profile = 'apprenant', objective = 'progresser', plan = 'free' } = {}) {
  return `Profil: ${profile}\nObjectif: ${objective}\nPlan: ${plan}\nRéponds en français avec un plan d'action MS Prods concret.`;
}
