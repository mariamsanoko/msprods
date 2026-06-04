const planFeatures = {
  free: ['landing', 'pricing'],
  pro: ['dashboard', 'formations', 'ai-coach', 'billing', 'settings'],
  enterprise: ['dashboard', 'formations', 'ai-coach', 'billing', 'settings', 'team']
};

export function checkAccess(plan = 'free', feature = 'dashboard') {
  const normalizedPlan = planFeatures[plan] ? plan : 'free';
  return {
    plan: normalizedPlan,
    feature,
    allowed: planFeatures[normalizedPlan].includes(feature),
    features: planFeatures[normalizedPlan]
  };
}
