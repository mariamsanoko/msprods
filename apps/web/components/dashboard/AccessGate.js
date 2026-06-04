'use client';

import { useAccess } from '../../hooks/useAccess';

export default function AccessGate({ feature, children }) {
  const { allowed, plan } = useAccess(feature);
  if (!allowed) return <div className="card"><span className="badge">Plan {plan}</span><p>Cette ressource nécessite une mise à niveau.</p></div>;
  return children;
}
