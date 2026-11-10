import { createBrowserClient } from '@supabase/ssr';
import { resolveSupabaseUrl } from '@/lib/db/supabase';

export function createClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseUrl = resolveSupabaseUrl(rawUrl) || 'https://demo-certivault.supabase.co';
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseKey = (rawKey && rawKey.trim() && rawKey !== 'your-anon-key' && rawKey !== 'demo-anon-key')
    ? rawKey
    : 'demo-anon-key-certivault-safe';

  return createBrowserClient(supabaseUrl, supabaseKey);
}
