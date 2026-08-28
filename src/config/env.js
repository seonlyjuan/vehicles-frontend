export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  ?? import.meta.env.VITE_SUPABASE_ANON_KEY;
function resolveApiUrl() {
  // In development, Vite forwards /api to FastAPI. Mobile devices therefore
  // only need access to the already reachable frontend port.
  if (import.meta.env.DEV) return '/api';

  const configuredUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
  const parsedUrl = new URL(configuredUrl);
  const browserIsRemote = !['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiIsLocal = ['localhost', '127.0.0.1'].includes(parsedUrl.hostname);

  // Auf dem Smartphone bezeichnet localhost das Smartphone selbst. Verwende
  // deshalb den Computer, von dem auch das Frontend geladen wurde.
  if (browserIsRemote && apiIsLocal) parsedUrl.hostname = window.location.hostname;

  return parsedUrl.toString().replace(/\/$/, '');
}

export const apiUrl = resolveApiUrl();
