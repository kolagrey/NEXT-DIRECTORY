declare module '@/lib/supabase' {
  import { SupabaseClient } from '@supabase/supabase-js';
  export const supabase: SupabaseClient;
}
