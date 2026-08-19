// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

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
        <Route path="/vehicles/bicycles/listing" element={<BicycleListing />} />
        <Route path="/vehicles/bicycles/listing/create" element={<CreateBicycleListing />} />

        <Route path="/vehicles/cars/listing" element={<CarListing />} />
        <Route path="/vehicles/cars/listing/create" element={<CreateCarListing />} />

        <Route path="/vehicles/motorbikes/listing" element={<MotorbikeListing />} />
        <Route path="/vehicles/motorbikes/listing/create" element={<CreateMotorbikeListing />} />


        {/* Fallback für unbekannte URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;