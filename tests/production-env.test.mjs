import assert from 'node:assert/strict';
import test from 'node:test';
import { requireHttpsOrigin, requirePublicSupabaseKey } from '../build/production-env.js';

test('production URLs require HTTPS and reject embedded credentials', () => {
  for (const value of [undefined, 'http://localhost:8000', 'invalid', 'https://user:secret@api.example.ch']) {
    assert.throws(() => requireHttpsOrigin({ VITE_API_URL: value }, 'VITE_API_URL'));
  }
  assert.equal(requireHttpsOrigin({ VITE_API_URL: 'https://api.example.ch/api' }, 'VITE_API_URL'), 'https://api.example.ch');
});

test('public Supabase keys are accepted while secret and missing keys fail', () => {
  requirePublicSupabaseKey({ VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' });
  const token = (role) => `header.${Buffer.from(JSON.stringify({ role })).toString('base64url')}.signature`;
  requirePublicSupabaseKey({ VITE_SUPABASE_ANON_KEY: token('anon') });
  for (const value of [undefined, '', 'your-publishable-key', 'sb_secret_private', token('service_role')]) {
    assert.throws(() => requirePublicSupabaseKey({ VITE_SUPABASE_PUBLISHABLE_KEY: value }));
  }
});
