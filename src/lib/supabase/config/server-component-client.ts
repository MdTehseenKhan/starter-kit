import { cache } from 'react';
import { cookies } from 'next/headers';
import { CookieMethodsServer, createServerClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/types';
import { env } from '@/utils/env';

export const getSupabaseServerComponentClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const url = env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (params.admin) {
      const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

      return createServerClient<Database>(url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        cookies: getCookiesStrategy(),
      });
    }

    return createServerClient<Database>(url, anonKey, {
      cookies: getCookiesStrategy(),
    });
  }
);

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    getAll: () => {
      return cookieStore.getAll();
    },
  } as CookieMethodsServer;
}
