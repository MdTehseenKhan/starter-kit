import { cache } from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { getSupabaseClientKeys } from '@/lib/supabase/config/get-supabase-client-keys';
import { Database } from '@/lib/supabase/types';

const getSupabaseServerComponentClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const keys = getSupabaseClientKeys();

    if (params.admin) {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided');
      }

      return createServerClient<Database>(keys.url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        // @ts-ignore
        cookies: {},
      });
    }

    return createServerClient<Database>(keys.url, keys.anonKey, {
      cookies: getCookiesStrategy(),
    });
  }
);

export default getSupabaseServerComponentClient;

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    get: (name: string) => {
      return cookieStore.get(name)?.value;
    },
  };
}
