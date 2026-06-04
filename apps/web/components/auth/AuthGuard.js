'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/login?next=/dashboard');
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <main className="container section">Chargement de l’espace privé…</main>;
  if (!isAuthenticated) return null;
  return children;
}
