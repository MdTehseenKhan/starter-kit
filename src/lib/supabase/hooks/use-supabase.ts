import { useMemo } from 'react';

import { getSupabaseBrowserClient } from '@/lib/supabase/config/browser-client';

export const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, []);
};
