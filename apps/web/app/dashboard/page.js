import { Stats } from '../../components/dashboard/Stats.js';

export const metadata = { title: 'Dashboard - MS Prods' };

export default function DashboardPage({ user = {} } = {}) {
  return `<section><h1>Tableau de bord</h1><p>Bienvenue ${user.name || 'dans ton espace privé'}.</p>${Stats({ plan: user.plan || 'free', completedCourses: user.completedCourses || 0, aiMessages: user.aiMessages || 0 })}<div class="quick-actions"><a href="/dashboard/formations">Continuer une formation</a><a href="/dashboard/ai-coach">Demander au coach IA</a></div></section>`;
}
