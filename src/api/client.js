import { apiUrl } from '../config/env';
import { supabase } from '../lib/supabase';

export async function apiRequest(path, { method = 'GET', body } = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Keine aktive Sitzung gefunden.');

  const isFormData = body instanceof FormData;
  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const data = response.status === 204
    ? null
    : contentType.includes('application/json')
      ? await response.json()
      : { detail: await response.text() };
  if (!response.ok) throw new Error(data.detail ?? 'Die Anfrage ist fehlgeschlagen.');
  return data;
}
