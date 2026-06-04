const attempts = new Map();

export function canSubmit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const current = attempts.get(key) || { count: 0, resetAt: now + windowMs };
  if (current.resetAt <= now) {
    current.count = 0;
    current.resetAt = now + windowMs;
  }
  current.count += 1;
  attempts.set(key, current);
  return current.count <= limit;
}
