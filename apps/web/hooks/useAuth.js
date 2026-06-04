'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(window.localStorage.getItem('msprods_token'));
    setIsLoading(false);
  }, []);

  return { token, isLoading, isAuthenticated: Boolean(token) };
}
