import { Link } from 'react-router-dom';

import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import { LegalFooter } from '../../components/legal/LegalFooter';

export function LoginPage({ auth }) {
  const params = new URLSearchParams(window.location.search);
  const redirectError = params.get('error_description') ?? params.get('error');

  return <div className="dashboard-wrapper">
    <main className="page login-page"><section className="card auth-card">
      <div className="logo"></div><h1>App-Name<br /></h1>
      <p className="intro">Melde dich sicher mit deinem Google-Konto an.</p>
      <GoogleSignInButton error={auth.error || redirectError} isLoading={auth.isLoading} isConfigured={auth.isGoogleConfigured} onSignIn={auth.signInWithGoogle} />
      <p className="privacy">
        Bitte lies vor der Anmeldung unsere <Link to="/legal/agb">AGB</Link> und
        {' '}<Link to="/legal/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </section></main>
    <LegalFooter />
  </div>;
}
