import { useCallback, useEffect, useState } from 'react';

import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { apiRequest } from '../api/client';
import { updateSellerProfile as saveSellerProfile } from '../api/profile';

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
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const oauthError = params.get('error_description') ?? params.get('error');
      const hasAuthParameters = params.has('code') || hashParams.has('access_token') || oauthError;

      if (oauthError) {
        if (mounted) {
          setError(oauthError);
          setIsInitializing(false);
        }
        return;
      }

      const result = await supabase.auth.getSession();

      if (!mounted) return;
      if (result.error) {
        setError(result.error.message);
      } else {
        await loadUserProfile(result.data.session?.user);
        if (hasAuthParameters) window.history.replaceState({}, document.title, window.location.pathname);
      }
      if (mounted) setIsInitializing(false);
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
