const PLAN_RULES = {
  free: ['dashboard:view', 'formations:preview'],
  starter: ['dashboard:view', 'formations:view', 'ai-coach:limited'],
  pro: ['dashboard:view', 'formations:view', 'ai-coach:full', 'billing:manage'],
  enterprise: ['dashboard:view', 'formations:view', 'ai-coach:full', 'billing:manage', 'settings:team']
};

export function getPlanCapabilities(plan = 'free') {
  return PLAN_RULES[plan] || PLAN_RULES.free;
}

export function hasAccess(plan, capability) {
  return getPlanCapabilities(plan).includes(capability);
}
