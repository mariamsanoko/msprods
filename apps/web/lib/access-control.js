export const PLANS = {
  free: {
    label: 'Découverte',
    features: ['landing', 'pricing'],
    aiMessagesPerMonth: 5
  },
  pro: {
    label: 'Pro',
    features: ['dashboard', 'formations', 'ai-coach', 'billing', 'settings'],
    aiMessagesPerMonth: 300
  },
  enterprise: {
    label: 'Entreprise',
    features: ['dashboard', 'formations', 'ai-coach', 'billing', 'settings', 'team'],
    aiMessagesPerMonth: 2000
  }
};

export function normalizePlan(plan) {
  return PLANS[plan] ? plan : 'free';
}

export function canAccess(plan, feature) {
  const normalizedPlan = normalizePlan(plan);
  return PLANS[normalizedPlan].features.includes(feature);
}

export function getPlanLimits(plan) {
  return PLANS[normalizePlan(plan)];
}
