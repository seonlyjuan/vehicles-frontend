import { useCallback, useEffect, useState } from 'react';

import { isSupabaseConfigured, supabase } from '../lib/supabase';

function toAppUser(user) {
  if (!user) return null;
  const metadata = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? '',
    name: metadata.full_name ?? metadata.name ?? user.email ?? 'Unbekannt',
    picture: metadata.avatar_url ?? metadata.picture ?? null,
  };
}

export function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(() => isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAppUser(session?.user));
      setIsInitializing(false);
    });

    let mounted = true;
    const finishAuthentication = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      const result = code
        ? await supabase.auth.exchangeCodeForSession(code)
        : await supabase.auth.getSession();

      if (!mounted) return;
      if (result.error) {
        setError(result.error.message);
      } else {
        setUser(toAppUser(result.data.session?.user));
        if (code) window.history.replaceState({}, document.title, window.location.pathname);
      }
      setIsInitializing(false);
    };

    finishAuthentication();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return;
    setError('');
    setIsLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (signInError) throw signInError;
    } catch (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } finally {
      // Successful OAuth redirects the browser before the request resolves visibly.
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    setError('');
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
  }, []);

  return { user, error, isLoading, isInitializing, signInWithGoogle, isGoogleConfigured: isSupabaseConfigured, signOut };
}
