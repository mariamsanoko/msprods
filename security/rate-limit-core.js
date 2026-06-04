export function createMemoryWindowLimiter({ limit = 60, windowMs = 60000 } = {}) {
  const buckets = new Map();

  return function consume(key) {
    const now = Date.now();
    const hits = (buckets.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
    hits.push(now);
    buckets.set(key, hits);
    return { allowed: hits.length <= limit, remaining: Math.max(0, limit - hits.length) };
  };
}
