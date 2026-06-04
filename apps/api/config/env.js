export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://www.msprods.fr,https://msprods.fr')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production'
};
