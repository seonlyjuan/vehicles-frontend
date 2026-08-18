import { useGoogleAuth } from './hooks/useGoogleAuth';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import './styles/auth.css';

function App() {
  const auth = useGoogleAuth();
  if (auth.isInitializing) return <main className="page"><p className="status">Sitzung wird geladen …</p></main>;
  return auth.user ? <DashboardPage user={auth.user} onSignOut={auth.signOut} /> : <LoginPage auth={auth} />;
}

export default App;
