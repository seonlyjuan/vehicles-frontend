import { post } from './client';

export function signInWithGoogle(credential) {
  return post('/auth/google', { credential });
}
