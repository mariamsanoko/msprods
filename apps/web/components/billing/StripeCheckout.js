'use client';

import { useState } from 'react';
import { startCheckout } from '../../lib/stripe';

export default function StripeCheckout({ plan = 'pro' }) {
  const [email, setEmail] = useState('');

  async function checkout() {
    const { url } = await startCheckout({ plan, email });
    window.location.href = url;
  }

  return <div className="form"><input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@exemple.com" /><button className="btn" onClick={checkout} type="button">Passer au plan {plan}</button></div>;
}
