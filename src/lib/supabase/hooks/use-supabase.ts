import { useMemo } from 'react';

import { getSupabaseBrowserClient } from '@/lib/supabase/config/client';

export const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, []);
};
