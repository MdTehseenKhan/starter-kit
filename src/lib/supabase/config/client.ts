import type { Database } from '@/lib/supabase/types/db';

import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseKeys } from './keys';

let client: ReturnType<typeof createBrowserClient<Database>>;

export function getSupabaseBrowserClient() {
  if (!client) {
    const { url, key } = getSupabaseKeys();
    client = createBrowserClient<Database>(url, key);
  }
  return client;
}
