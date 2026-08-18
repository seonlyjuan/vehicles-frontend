export function GoogleSignInButton({ error, isLoading, isConfigured, onSignIn }) {
  if (!isConfigured) {
    return <p className="configuration-note">Supabase Login ist noch nicht eingerichtet. Ergänze <code>VITE_SUPABASE_URL</code> und <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in <code>client/.env</code>.</p>;
  }

  return <>
    <button className="google-login" type="button" onClick={onSignIn} disabled={isLoading}>
      {isLoading ? 'Weiterleitung zu Google …' : 'Mit Google fortfahren'}
    </button>
    {isLoading && <p className="status">Anmeldung wird vorbereitet …</p>}
    {error && <p className="error" role="alert">{error}</p>}
  </>;
}
