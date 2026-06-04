'use client';

import { canUse } from '../lib/access-control';
import { useSubscription } from './useSubscription';

export function useAccess(feature) {
  const { plan } = useSubscription();
  return { plan, allowed: canUse(plan, feature) };
}
