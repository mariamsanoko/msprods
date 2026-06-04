import { AccessGate } from '../../../components/dashboard/AccessGate.js';

export const metadata = { title: 'Réglages - MS Prods' };

export default function SettingsPage({ plan = 'free', user = {} } = {}) {
  const content = `<section><h1>Réglages</h1><p>Email : ${user.email || 'non renseigné'}</p><a href="/dashboard/billing">Modifier mon abonnement</a></section>`;
  return AccessGate({ plan, feature: 'settings', children: content });
}
