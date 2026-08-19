// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { MainLayout } from './pages/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';

import { BicycleListing } from './pages/vehicles/bicycles/listing/ListingPage';
import { CreateBicycleListing } from './pages/vehicles/bicycles/listing/CreateListingPage';

import { CarListing } from './pages/vehicles/cars/listing/ListingPage';
import { CreateCarListing } from './pages/vehicles/cars/listing/CreateListingPage';

import { MotorbikeListing } from './pages/vehicles/motorbikes/listing/ListingPage';
import { CreateMotorbikeListing } from './pages/vehicles/motorbikes/listing/CreateListingPage';

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
        {/* Nicht-eingeloggte User sehen nur die Login-Seite */}
        {!auth.user ? (
          <>
            <Route path="/" element={<LoginPage auth={auth} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* Eingeloggte User nutzen automatisch das MainLayout für alle Routen */
          <Route element={<MainLayout user={auth.user} onSignOut={auth.signOut} />}>
            <Route path="/" element={<DashboardPage user={auth.user} />} />
            
            <Route path="/profile" element={<ProfilePage user={auth.user} />} />

            <Route path="/vehicles/bicycles/listing" element={<BicycleListing />} />
            {/* Hier wird der user-Prop übergeben: */}
            <Route path="/vehicles/bicycles/listing/create" element={<CreateBicycleListing user={auth.user} />} />

            <Route path="/vehicles/cars/listing" element={<CarListing />} />
            <Route path="/vehicles/cars/listing/create" element={<CreateCarListing user={auth.user} />} />

            <Route path="/vehicles/motorbikes/listing" element={<MotorbikeListing />} />
            <Route path="/vehicles/motorbikes/listing/create" element={<CreateMotorbikeListing user={auth.user} />} />

            {/* Fallback für unbekannte URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;