import { createSafeActionClient } from 'next-safe-action';

import { getSupabaseServerClient } from '@/lib/supabase/config/server';
import { logger } from '@/utils/logger';

export const safeActionClient = createSafeActionClient({
  handleServerError: (error) => {
    logger.error({ error }, 'SERVER ERROR:');
    if (error instanceof Error) {
      return { serverError: error.message };
    }
    return { serverError: 'Oh no, something went wrong!' };
  },
});

export const authActionClient = safeActionClient.use(async ({ next }) => {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const authUser = data?.user;

  if (error || !authUser) {
    throw new Error('Unauthorized');
  }

  return next({
    ctx: {
      supabase,
      authUser,
    },
  });
});
