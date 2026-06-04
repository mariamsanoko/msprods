'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function ChatIA() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Bonjour, quel objectif veux-tu atteindre avec Microsoft, IA ou NoCode ?' }]);
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    const content = message.trim();
    if (!content) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setMessage('');
    const data = await apiFetch('/chat', { method: 'POST', body: JSON.stringify({ message: content, history: next.slice(-8) }) });
    setMessages([...next, { role: 'assistant', content: data.answer }]);
  }

  return (
    <section className="card">
      <div className="chat-box">{messages.map((item, index) => <div className={`message ${item.role}`} key={`${item.role}-${index}`}>{item.content}</div>)}</div>
      <form className="form" onSubmit={submit}>
        <input className="input" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Pose ta question…" />
        <button className="btn" type="submit">Envoyer</button>
      </form>
    </section>
  );
}
