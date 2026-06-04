'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';
import { saveSession } from '../../lib/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const { token } = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email }) });
      saveSession(token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form card" onSubmit={submit}>
      <label>Email<input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      {error ? <p role="alert">{error}</p> : null}
      <button className="btn" type="submit">Se connecter</button>
    </form>
  );
}
