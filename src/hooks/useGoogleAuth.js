import { useCallback, useEffect, useState } from 'react';

import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { apiRequest } from '../api/client';
import { updateSellerProfile as saveSellerProfile } from '../api/profile';

const OAUTH_QUERY_PARAMETERS = ['code', 'error', 'error_code', 'error_description'];

function readOAuthCallback() {
  const url = new URL(window.location.href);
  const hashParameters = new URLSearchParams(url.hash.slice(1));
  const error = url.searchParams.get('error_description')
    ?? url.searchParams.get('error')
    ?? hashParameters.get('error_description')
    ?? hashParameters.get('error');
  const hasAuthFragment = ['access_token', 'refresh_token', ...OAUTH_QUERY_PARAMETERS]
    .some((parameter) => hashParameters.has(parameter));

  return {
    error,
    hasParameters: OAUTH_QUERY_PARAMETERS.some((parameter) => url.searchParams.has(parameter))
      || hasAuthFragment,
    hasAuthFragment,
  };
}

function clearOAuthCallbackUrl({ hasParameters, hasAuthFragment }) {
  if (!hasParameters) return;

  const url = new URL(window.location.href);
  OAUTH_QUERY_PARAMETERS.forEach((parameter) => url.searchParams.delete(parameter));
  if (hasAuthFragment) url.hash = '';

  window.history.replaceState(
    {},
    document.title,
    `${url.pathname}${url.search}${url.hash}`,
  );
}

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

  const loadUserProfile = useCallback(async (authUser) => {
    const appUser = toAppUser(authUser);
    if (!appUser || !supabase) {
      setUser(appUser);
      return;
    }

    try {
      const profile = await apiRequest('/profile');
      setUser({ ...appUser, ...profile, username: profile.username ?? null });
    } catch (profileError) {
      setError(profileError.message);
      setUser({ ...appUser, username: null, seller_type: 'private', platform_role: 'user' });
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') return;

      // Run profile/API requests outside Supabase's auth callback to avoid
      // blocking the auth client's internal session lock.
      window.setTimeout(() => {
        if (!mounted) return;
        void loadUserProfile(session?.user).finally(() => {
          if (mounted) setIsInitializing(false);
        });
      }, 0);
    });

    const finishAuthentication = async () => {
      const oauthCallback = readOAuthCallback();

      if (oauthCallback.error) {
        clearOAuthCallbackUrl(oauthCallback);
        if (mounted) {
          setError(oauthCallback.error);
          setIsInitializing(false);
        }
        return;
      }

      try {
        const result = await supabase.auth.getSession();
        clearOAuthCallbackUrl(oauthCallback);

        if (!mounted) return;
        if (result.error) {
          setError(result.error.message);
        } else {
          await loadUserProfile(result.data.session?.user);
        }
      } catch (authenticationError) {
        if (mounted) setError(authenticationError.message ?? 'Anmeldung fehlgeschlagen.');
      } finally {
        clearOAuthCallbackUrl(oauthCallback);
        if (mounted) setIsInitializing(false);
      }
    };

    void finishAuthentication();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

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
    if (signOutError) {
      await supabase.auth.signOut({ scope: 'local' });
      setError(signOutError.message);
    }
  }, []);

  const updateUsername = useCallback(async (username) => {
    if (!supabase || !user) throw new Error('Keine aktive Sitzung gefunden.');

    const normalizedUsername = username.trim().toLowerCase();
    const data = await apiRequest('/profile/username', {
      method: 'PUT',
      body: { username: normalizedUsername },
    });

    setUser((currentUser) => ({ ...currentUser, username: data.username }));
  }, [user]);

  const updateSellerProfile = useCallback(async (payload) => {
    if (!supabase || !user) throw new Error('Keine aktive Sitzung gefunden.');
    const data = await saveSellerProfile(payload);
    setUser((currentUser) => ({ ...currentUser, ...data }));
    return data;
  }, [user]);

  return {
    user,
    error,
    isLoading,
    isInitializing,
    signInWithGoogle,
    isGoogleConfigured: isSupabaseConfigured,
    signOut,
    updateUsername,
    updateSellerProfile,
  };
}
