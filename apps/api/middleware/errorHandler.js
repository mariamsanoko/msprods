export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const isOperational = statusCode < 500;
  if (!isOperational) console.error(error);

  res.status(statusCode).json({
    error: isOperational ? error.message : 'Le service est momentanément indisponible. Réessayez dans quelques instants.'
  });
}
