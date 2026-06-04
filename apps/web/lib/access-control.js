export const PLAN_FEATURES = {
  free: ['Aperçu formations', 'Dashboard découverte'],
  starter: ['Formations complètes', 'Coach IA limité'],
  pro: ['Formations complètes', 'Coach IA illimité', 'Support prioritaire'],
  enterprise: ['Accès équipe', 'Accompagnement sur mesure', 'Sécurité renforcée']
};

export function canUse(plan = 'free', feature = '') {
  return (PLAN_FEATURES[plan] || PLAN_FEATURES.free).some((item) => item.toLowerCase().includes(feature.toLowerCase()));
}
