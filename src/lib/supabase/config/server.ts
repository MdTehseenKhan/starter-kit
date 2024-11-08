import type { Database } from '@/lib/supabase/types/db';
import type { CookieMethodsServer } from '@supabase/ssr';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getSupabaseKeys } from './keys';
import { suppressWarnings } from './suppress-warnings';

suppressWarnings();

export const getSupabaseServerClient = async (params = { admin: false }) => {
  const { url, key } = getSupabaseKeys(params);
  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    cookies: {
      getAll: () => {
        return cookieStore.getAll();
      },
      setAll: (cookiesToSet) => {
        for (const { name, value } of cookiesToSet) {
          cookieStore.set(name, value);
        }
      },
    } as CookieMethodsServer,
  });
};
