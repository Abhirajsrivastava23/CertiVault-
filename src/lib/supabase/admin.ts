import { createClient } from '@supabase/supabase-js';

// Dedicated admin client utilizing the SUPABASE_SERVICE_ROLE_KEY
// Never expose this client or the service role key to the browser!
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-certivault.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
