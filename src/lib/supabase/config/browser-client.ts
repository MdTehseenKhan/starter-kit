import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/lib/supabase/types';
import { getSupabaseClientKeys } from './get-supabase-client-keys';

let client: ReturnType<typeof createBrowserClient<Database>>;

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }
  const { url, anonKey } = getSupabaseClientKeys();
  client = createBrowserClient<Database>(url, anonKey);
  return client;
}
