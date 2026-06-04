import { canAccess, getPlanLimits } from '../lib/access-control.js';

export function useAccess(plan = 'free') {
  return {
    canAccess: (feature) => canAccess(plan, feature),
    limits: getPlanLimits(plan)
  };
}
