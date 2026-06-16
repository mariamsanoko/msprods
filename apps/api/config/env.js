export function readEnv() {
  return {
    port: Number(process.env.PORT || 3000),

    nodeEnv:
        process.env.NODE_ENV || 'development',

    allowedOrigins: (
        process.env.ALLOWED_ORIGINS ||
        'http://localhost:3000,http://localhost:3001'
    )
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),

    openaiApiKey:
        process.env.OPENAI_API_KEY || '',

    openaiModel:
        process.env.OPENAI_MODEL || 'gpt-4.1-mini',

    airtableApiKey:
        process.env.AIRTABLE_API_KEY || '',

    airtableBaseId:
        process.env.AIRTABLE_BASE_ID || ''
  };
}