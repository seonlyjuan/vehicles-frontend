// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ListingPage } from './pages/listing/ListingPage';
import { CreateListingPage } from './pages/listing/CreateListingPage';
import './styles/auth.css';

function App() {
  const auth = useGoogleAuth();

  if (auth.isInitializing) {
    return (
      <main className="page">
        <p className="status">Sitzung wird geladen …</p>
      </main>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Startseite */}
        <Route 
          path="/" 
          element={
            auth.user ? (
              <DashboardPage user={auth.user} onSignOut={auth.signOut} />
            ) : (
              <LoginPage auth={auth} />
            )
          } 
        />

        {/* 2. Hier die Route für listings */}
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/listing/create" element={<CreateListingPage />} />

        {/* Fallback für unbekannte URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;