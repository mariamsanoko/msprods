export function saveSession(token) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('msprods_token', token);
    document.cookie = `msprods_token=${token}; path=/; max-age=604800; samesite=lax`;
  }
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('msprods_token');
    document.cookie = 'msprods_token=; path=/; max-age=0; samesite=lax';
  }
}
