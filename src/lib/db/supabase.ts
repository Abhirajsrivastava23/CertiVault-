import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Validates and normalizes a Supabase URL safely so that invalid, placeholder,
 * or scheme-less strings never crash during build or runtime evaluation.
 */
export function resolveSupabaseUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === 'your-supabase-url' ||
    trimmed === 'your-project.supabase.co' ||
    trimmed === 'https://your-project.supabase.co'
  ) {
    return null;
  }
  try {
    const formatted =
      trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? trimmed
        : `https://${trimmed}`;
    const parsed = new URL(formatted);
    if (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      parsed.hostname &&
      (parsed.hostname.includes('.') || parsed.hostname === 'localhost')
    ) {
      return formatted;
    }
  } catch {
    return null;
  }
  return null;
}

const safeUrl = resolveSupabaseUrl(rawUrl);
const hasValidKey = Boolean(
  rawAnonKey &&
  rawAnonKey.trim() &&
  rawAnonKey !== 'your-publishable-key' &&
  rawAnonKey !== 'your-anon-key' &&
  rawAnonKey !== 'demo-anon-key'
);
const hasValidServiceKey = Boolean(
  rawServiceKey &&
  rawServiceKey.trim() &&
  rawServiceKey !== 'your-service-role-key'
);

export const isSupabaseConfigured = Boolean(safeUrl && hasValidKey);

/**
 * Public Supabase client for client-side operations (subject to RLS)
 */
export const supabase = isSupabaseConfigured
  ? createClient(safeUrl!, rawAnonKey!)
  : null;

/**
 * Admin Supabase client using Service Role for server-only operations
 * (used for voucher allocation, webhook verification, and private schema transactions)
 */
export const supabaseAdmin = Boolean(safeUrl && hasValidServiceKey)
  ? createClient(safeUrl!, rawServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
