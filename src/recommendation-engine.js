const SIGNALS = [
  {
    path: 'Parcours Power Platform débutant',
    keywords: ['debutant', 'debuter', 'power apps', 'power platform', 'application', 'app', 'no-code', 'nocode'],
    reason: 'besoin de créer des applications métier sans code'
  },
  {
    path: 'Parcours Automatisation Power Automate',
    keywords: ['automatiser', 'automatisation', 'workflow', 'flux', 'power automate', 'relance', 'processus'],
    reason: 'besoin d’automatiser des processus métier'
  },
  {
    path: 'Parcours Dynamics 365 CRM',
    keywords: ['crm', 'dynamics', 'vente', 'commercial', 'client', 'pipeline', 'relation client'],
    reason: 'besoin de structurer la relation client et les ventes'
  },
  {
    path: 'Parcours IA & NoCode Ops',
    keywords: ['ia', 'ai', 'chatgpt', 'airtable', 'tally', 'n8n', 'codex', 'assistant'],
    reason: 'besoin de connecter IA, données et automatisations NoCode'
  }
];

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function recommendPath(message, airtableResults = {}) {
  const haystack = normalize([
    message,
    ...Object.values(airtableResults).flat().map((record) => JSON.stringify(record.fields || {}))
  ].join(' '));

  const ranked = SIGNALS.map((signal) => ({
    ...signal,
    score: signal.keywords.reduce((score, keyword) => score + (haystack.includes(normalize(keyword)) ? 1 : 0), 0)
  })).sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score === 0) {
    return 'Demander le niveau actuel, l’objectif métier, le délai et le budget avant de recommander un parcours.';
  }

  return `${best.path} recommandé car le message indique un ${best.reason}. Vérifier dans Airtable les formations et tarifs disponibles avant de l’affirmer au prospect.`;
}
