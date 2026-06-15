import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Uses the service-role key so it bypasses RLS — only call this from API routes / server code.
 * Never import this file in client components.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer the service-role key for server writes; fall back to the publishable
  // anon key if only that is available (requires RLS policy to allow inserts).
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) must be set."
    );
  }

  return createClient(url, key, {
    auth: {
      // Disable auto-refresh / session storage — not needed in server context
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
