'use server';

import { z } from 'zod';

import { authActionClient } from '@/core/server/actions/safe-action';

const schema = z.object({
  test: z.string(),
});

export const demoAction = authActionClient
  .schema(schema)
  .action(async ({ ctx: { supabase, authUser }, parsedInput: { test } }) => {
    // Logic
  });
