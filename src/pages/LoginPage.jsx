import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';

export function LoginPage({ auth }) {
  const params = new URLSearchParams(window.location.search);
  const redirectError = params.get('error_description') ?? params.get('error');

  return <main className="page"><section className="card">
    <div className="logo">A</div><p className="eyebrow">Willkommen</p><h1>Dein Konto für<br />deine App</h1>
    <p className="intro">Melde dich sicher mit deinem Google-Konto an oder erstelle damit direkt ein neues Konto.</p>
    <GoogleSignInButton error={auth.error || redirectError} isLoading={auth.isLoading} isConfigured={auth.isGoogleConfigured} onSignIn={auth.signInWithGoogle} />
    <p className="privacy">Mit der Anmeldung stimmst du unseren Nutzungsbedingungen und Datenschutzhinweisen zu.</p>
  </section></main>;
}
