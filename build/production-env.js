export function requireHttpsOrigin(env, variableName) {
  try {
    const url = new URL(env[variableName]);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash) {
      return url.origin;
    }
  } catch {
    // Never include a configured value in a build error.
  }
  throw new Error(`${variableName} must be an absolute HTTPS URL for a production build.`);
}

export function requirePublicSupabaseKey(env) {
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_ANON_KEY;
  if (key?.startsWith('sb_publishable_') && key.length > 'sb_publishable_'.length) return;
  try {
    const parts = key.split('.');
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (parts.length === 3 && payload.role === 'anon') return;
  } catch {
    // An invalid or server-only key must not be included in a browser bundle.
  }
  throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY must be a public Supabase key (or set VITE_SUPABASE_ANON_KEY to a legacy anon key).');
}
