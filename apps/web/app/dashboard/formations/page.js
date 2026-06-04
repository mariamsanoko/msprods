import { AccessGate } from '../../../components/dashboard/AccessGate.js';

export const metadata = { title: 'Formations - MS Prods' };

export default function FormationsPage({ plan = 'free' } = {}) {
  const content = '<section><h1>Mes formations</h1><ul><li>Power Platform Débutant</li><li>Power Automate Business</li><li>Dynamics 365 CRM</li></ul></section>';
  return AccessGate({ plan, feature: 'formations', children: content });
}
