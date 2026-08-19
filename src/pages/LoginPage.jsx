import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';

export function LoginPage({ auth }) {
  const params = new URLSearchParams(window.location.search);
  const redirectError = params.get('error_description') ?? params.get('error');

  return <main className="page"><section className="card">
    <div className="logo"></div><p className="eyebrow"></p><h1>Anmelden<br /></h1>
    <p className="intro">Melde dich sicher mit deinem Google-Konto an.</p>
    <GoogleSignInButton error={auth.error || redirectError} isLoading={auth.isLoading} isConfigured={auth.isGoogleConfigured} onSignIn={auth.signInWithGoogle} />
    <p className="privacy">Mit der Anmeldung stimmst du unseren Nutzungsbedingungen und Datenschutzhinweisen zu.</p>
  </section></main>;
}