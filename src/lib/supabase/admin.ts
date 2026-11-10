import { createClient } from '@supabase/supabase-js';
import { resolveSupabaseUrl } from '@/lib/db/supabase';

// Dedicated admin client utilizing the SUPABASE_SERVICE_ROLE_KEY
// Never expose this client or the service role key to the browser!
export function createAdminClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseUrl = resolveSupabaseUrl(rawUrl) || 'https://demo-certivault.supabase.co';
  const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceRoleKey = (rawServiceKey && rawServiceKey.trim() && rawServiceKey !== 'your-service-role-key' && rawServiceKey !== 'demo-service-role-key')
    ? rawServiceKey
    : 'demo-service-role-key-certivault-safe';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
