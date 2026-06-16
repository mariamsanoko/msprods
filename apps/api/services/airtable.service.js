import Airtable from 'airtable';

const DEFAULT_AIRTABLE_ENDPOINT_URL = 'https://api.airtable.com';
const DEFAULT_AIRTABLE_BASE_ID= 'aappjOZNBgGsu0P6cA';
const DEFAULT_TABLES = {
  formations: 'FORMATIONS',
  faq: 'FAQ',
  parcours: 'PARCOURS'
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map();

let configuredClientKey = '';
let configuredBase;

function getConfig() {
  return {
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: process.env.AIRTABLE_ENDPOINT_URL || DEFAULT_AIRTABLE_ENDPOINT_URL,
    baseId: process.env.AIRTABLE_BASE_ID || DEFAULT_AIRTABLE_BASE_ID,
    tables: {
      formations: process.env.AIRTABLE_FORMATIONS_TABLE || DEFAULT_TABLES.formations,
      faq: process.env.AIRTABLE_FAQ_TABLE || DEFAULT_TABLES.faq,
      parcours: process.env.AIRTABLE_PARCOURS_TABLE || DEFAULT_TABLES.parcours
    },
    leadsTable: process.env.AIRTABLE_LEADS_TABLE || ''
  };
}

function assertAirtableConfig({ apiKey, baseId }) {
  if (!apiKey || !baseId) {
    throw new Error('Airtable configuration is missing. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.');
  }
}

function getAirtableBase() {
  const { apiKey, endpointUrl, baseId } = getConfig();
  assertAirtableConfig({ apiKey, baseId });

  const clientKey = `${endpointUrl}:${apiKey}:${baseId}`;
  if (configuredBase && configuredClientKey === clientKey) return configuredBase;

  Airtable.configure({
    endpointUrl,
    apiKey
  });

  configuredClientKey = clientKey;
  configuredBase = Airtable.base(baseId);
  return configuredBase;
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function tokenize(text) {
  const stopWords = new Set([
    'avec', 'pour', 'dans', 'une', 'des', 'les', 'aux', 'sur', 'que', 'qui', 'quoi',
    'comment', 'formation', 'formations', 'parcours', 'prix', 'tarif', 'tarifs', 'bonjour',
    'hello', 'salut', 'merci', 'vous', 'nous', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
    'le', 'la', 'de', 'du', 'un', 'et', 'ou', 'a', 'je', 'tu', 'il', 'elle', 'on'
  ]);

  return normalizeText(text)
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function recordToSearchableText(record) {
  return Object.entries(record.fields || {})
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : value}`)
    .join('\n');
}

function scoreRecord(record, queryTokens) {
  const searchable = normalizeText(recordToSearchableText(record));
  if (!queryTokens.length) return 0;

  return queryTokens.reduce((score, token) => {
    if (!searchable.includes(token)) return score;
    const exactWordMatches = searchable.match(new RegExp(`\\b${token}\\b`, 'g'))?.length || 0;
    return score + 2 + exactWordMatches;
  }, 0);
}

function compactRecord(record) {
  return {
    id: record.id,
    fields: record.fields || {}
  };
}

async function fetchTableRecords(tableName) {
  const cacheKey = `table:${tableName}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) {
    return cached.records;
  }

  const base = getAirtableBase();
  const records = await base(tableName)
    .select({ pageSize: 100 })
    .all();
  const compactRecords = records.map(compactRecord);

  cache.set(cacheKey, { createdAt: Date.now(), records: compactRecords });
  return compactRecords;
}

export async function searchKnowledgeBase(query, { limitPerTable = 3 } = {}) {
  const { tables } = getConfig();
  const queryTokens = tokenize(query);
  const entries = await Promise.all(
    Object.entries(tables).map(async ([key, tableName]) => {
      const records = await fetchTableRecords(tableName);
      const ranked = records
        .map((record) => ({ ...record, _score: scoreRecord(record, queryTokens) }))
        .filter((record) => record._score > 0)
        .sort((a, b) => b._score - a._score)
        .slice(0, limitPerTable)
        .map(({ _score, ...record }) => ({ ...record, relevanceScore: _score }));

      return [key, ranked];
    })
  );

  return Object.fromEntries(entries);
}

export async function captureLead({ email, name, message, recommendedPath }) {
  const { leadsTable } = getConfig();
  if (!leadsTable || !email) return { captured: false, reason: 'Lead table disabled or email missing.' };

  const fields = {
    Email: email,
    Source: 'MS Prods Airtable Brain',
    Message: message || '',
    'Parcours recommande': recommendedPath || '',
    Date: new Date().toISOString()
  };

  if (name) fields.Nom = name;

  const createdRecords = await getAirtableBase()(leadsTable).create([{ fields }]);
  return { captured: true, id: createdRecords[0]?.id };
}

export function formatContextForPrompt(results, recommendedPath) {
  const tableLabels = {
    formations: 'FORMATIONS',
    faq: 'FAQ',
    parcours: 'PARCOURS'
  };

  const sections = Object.entries(results).map(([key, records]) => {
    const content = records.length
      ? records.map((record, index) => `${index + 1}. ${JSON.stringify(record.fields)}`).join('\n')
      : 'Aucun enregistrement pertinent trouvé.';
    return `## ${tableLabels[key] || key}\n${content}`;
  });

  sections.push(`## RECOMMANDATION_INTERNE\n${recommendedPath || 'Aucun parcours recommandé automatiquement.'}`);
  return sections.join('\n\n');
}
