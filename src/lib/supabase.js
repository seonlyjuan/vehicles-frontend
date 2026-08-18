import { createClient } from '@supabase/supabase-js';

import { supabasePublishableKey, supabaseUrl } from '../config/env';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

// The publishable/anon key is safe in a browser. Never put a service-role key here.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
    auth: { detectSessionInUrl: false },
  })
  : null;
