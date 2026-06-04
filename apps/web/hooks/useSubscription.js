export function useSubscription(user) {
  return {
    plan: user?.plan || 'free',
    status: user?.subscriptionStatus || 'inactive',
    loading: false
  };
}
