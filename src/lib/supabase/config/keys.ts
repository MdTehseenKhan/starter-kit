import { env } from '@/utils/env';

export function getSupabaseKeys(params = { admin: false }) {
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    key: !params.admin
      ? env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : env.SUPABASE_SERVICE_ROLE_KEY,
  };
}
