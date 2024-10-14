import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/types';
import { env } from '@/utils/env';

let client: ReturnType<typeof createBrowserClient<Database>>;

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = createBrowserClient<Database>(url, anonKey);

  return client;
}
