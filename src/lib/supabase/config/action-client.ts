'use server';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/types';
import { env } from '@/utils/env';
import { getSupabaseClientKeys } from './get-supabase-client-keys';

const createServerSupabaseClient = cache(() => {
  const { url, anonKey } = getSupabaseClientKeys();

  return createServerClient<Database>(url, anonKey, {
    cookies: getCookiesStrategy(),
  });
});

const getSupabaseServerActionClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const { url } = getSupabaseClientKeys();

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

    return createServerSupabaseClient();
  }
);

function getCookiesStrategy() {
  const cookieStore = cookies();

  return {
    get: (name: string) => {
      return cookieStore.get(name)?.value;
    },
    set: (name: string, value: string, options: any) => {
      cookieStore.set({ name, value, ...options });
    },
    remove: (name: string, options: any) => {
      cookieStore.set({
        name,
        value: '',
        ...options,
      });
    },
  };
}

export default getSupabaseServerActionClient;
