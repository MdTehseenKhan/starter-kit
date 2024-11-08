import type { Database } from '@/lib/supabase/types/db';
import type { AuthUser, SupabaseClient } from '@supabase/supabase-js';

export type Supabase = SupabaseClient<Database>;

export type WithId<T> = T & { id: string };
export type WithAuthUser<T> = T & { auth: AuthUser };
