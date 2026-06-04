import { canAccess } from '../../lib/access-control.js';

export function AccessGate({ plan = 'free', feature, children = '' } = {}) {
  if (canAccess(plan, feature)) return children;
  return '<section class="access-gate"><h2>Upgrade requis</h2><p>Cette section est disponible avec un plan Pro ou Entreprise.</p><a href="/pricing">Voir les offres</a></section>';
}
