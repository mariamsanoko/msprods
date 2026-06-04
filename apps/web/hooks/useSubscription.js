'use client';

import { useMemo } from 'react';

export function useSubscription() {
  return useMemo(() => ({ plan: 'pro', status: 'active', renewsAt: '2026-07-01' }), []);
}
