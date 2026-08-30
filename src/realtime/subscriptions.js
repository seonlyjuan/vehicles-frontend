import { supabase } from '../lib/supabase';

export function createSubscription(channelName, table, filter, onChange) {
  if (!supabase) return () => {};
  const channel = supabase
    .channel(channelName)
    .on('postgres_changes', { event: '*', schema: 'public', table, filter }, onChange)
    .subscribe();
  return () => { void supabase.removeChannel(channel); };
}

