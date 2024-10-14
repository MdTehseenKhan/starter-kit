import { cache } from 'react';
import { cookies } from 'next/headers';
import { CookieMethodsServer, createServerClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/types';
import { env } from '@/utils/env';

export const getSupabaseRouteHandlerClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const url = env.NEXT_PUBLIC_SUPABASE_URL;

    if (params.admin) {
      const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided');
      }

      return createServerClient<Database>(url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        cookies: {
          getAll() {
            return cookies().getAll();
          },
        },
      });
    }

    const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    return createServerClient<Database>(url, anonKey, {
      cookies: getCookiesStrategy(),
    });
  }
);

export default getSupabaseRouteHandlerClient;

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      } catch {}
    },
  } as CookieMethodsServer;
}
