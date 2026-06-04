export function createClientRateLimiter({ limit = 10, windowMs = 60000 } = {}) {
  const hits = new Map();

  return function allow(key) {
    const now = Date.now();
    const bucket = hits.get(key) || [];
    const recent = bucket.filter((timestamp) => now - timestamp < windowMs);
    recent.push(now);
    hits.set(key, recent);
    return recent.length <= limit;
  };
}
