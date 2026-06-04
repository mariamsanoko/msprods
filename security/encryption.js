import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey() {
  const secret = process.env.ENCRYPTION_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('ENCRYPTION_SECRET or JWT_SECRET is required.');
  return crypto.createHash('sha256').update(secret).digest();
}

export function encryptText(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('base64url')}.${tag.toString('base64url')}.${encrypted.toString('base64url')}`;
}

export function decryptText(value) {
  const [iv, tag, encrypted] = String(value || '').split('.');
  if (!iv || !tag || !encrypted) throw new Error('Malformed encrypted value.');
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
}
