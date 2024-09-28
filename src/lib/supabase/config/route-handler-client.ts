import { cache } from 'react';
import { cookies } from 'next/headers';
import { CookieOptions, createServerClient } from '@supabase/ssr';

import { getSupabaseClientKeys } from '@/lib/supabase/config/get-supabase-client-keys';
import { Database } from '@/lib/supabase/types';
import { env } from '@/utils/env';

const getSupabaseRouteHandlerClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const { url, anonKey } = getSupabaseClientKeys();

    if (params.admin) {
      const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided');
      }

      return createServerClient<Database>(url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        // @ts-ignore
        cookies: {},
      });
    }

    return createServerClient<Database>(url, anonKey, {
      cookies: getCookiesStrategy(),
    });
  }
);

export default getSupabaseRouteHandlerClient;

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    set: (name: string, value: string, options: CookieOptions) => {
      cookieStore.set({ name, value, ...options });
    },
    get: (name: string) => {
      return cookieStore.get(name)?.value;
    },
    remove: (name: string, options: CookieOptions) => {
      cookieStore.set({ name, value: '', ...options });
    },
  };
}
