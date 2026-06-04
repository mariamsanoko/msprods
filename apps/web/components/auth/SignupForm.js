'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';
import { saveSession } from '../../lib/auth';

export default function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '' });

  async function submit(event) {
    event.preventDefault();
    const { token } = await apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(form) });
    saveSession(token);
    window.location.href = '/dashboard';
  }

  return (
    <form className="form card" onSubmit={submit}>
      <label>Nom<input className="input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
      <label>Email<input className="input" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
      <button className="btn" type="submit">Créer mon compte</button>
    </form>
  );
}
