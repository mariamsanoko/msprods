const inMemoryUsers = new Map();

export async function findUserByEmail(email) {
  return inMemoryUsers.get(String(email || '').toLowerCase()) || null;
}

export async function upsertUser(user) {
  const email = String(user.email || '').toLowerCase();
  if (!email) throw new Error('Email is required.');
  const nextUser = { plan: 'free', createdAt: new Date().toISOString(), ...user, email };
  inMemoryUsers.set(email, nextUser);
  return nextUser;
}
