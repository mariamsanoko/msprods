import { ChatIA } from '../../../components/ai/ChatIA.js';
import { AccessGate } from '../../../components/dashboard/AccessGate.js';

export const metadata = { title: 'Coach IA - MS Prods' };

export default function AiCoachPage({ plan = 'free' } = {}) {
  return AccessGate({ plan, feature: 'ai-coach', children: ChatIA() });
}
