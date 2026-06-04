export const supabaseConfig = {
  url: process.env.SUPABASE_URL || '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
};
