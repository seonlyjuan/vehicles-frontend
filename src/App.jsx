// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { DashboardPage } from './pages/general/DashboardPage';
import { MainLayout } from './pages/general/MainLayout';
import { ConversationPage } from './pages/messages/ConversationPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { LoginPage } from './pages/profile/LoginPage';
import { ProfileListingsPage } from './pages/profile/ProfileListingsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { UsernamePage } from './pages/profile/UsernamePage';
import { CreateVehicleListingPage } from './pages/vehicles/CreateVehicleListingPage';
import { VehicleListingDetailPage } from './pages/vehicles/VehicleListingDetailPage';
import { VehiclePaymentPage } from './pages/vehicles/VehiclePaymentPage';

import { BicycleListing } from './pages/vehicles/bicycles/listing/ListingPage';

import { CarListing } from './pages/vehicles/cars/listing/ListingPage';

import { MotorbikeListing } from './pages/vehicles/motorbikes/listing/ListingPage';

import './styles/auth.css';

function App() {
  const auth = useGoogleAuth();

  if (auth.isInitializing) {
    return (
      <main className="auth-initializing" role="status" aria-label="Anmeldung wird geprüft">
        <div className="auth-spinner" aria-hidden="true" />
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
            <Route path="/profile/username" element={<UsernamePage user={auth.user} updateUsername={auth.updateUsername} />} />
            <Route path="/" element={<DashboardPage />} />
            
            <Route path="/profile" element={<ProfilePage user={auth.user} />} />
            <Route path="/profile/listings" element={<ProfileListingsPage />} />
            <Route path="/messages" element={<MessagesPage user={auth.user} />} />
            <Route path="/messages/:conversationId" element={<ConversationPage user={auth.user} />} />

            <Route path="/vehicles/bicycles/listing" element={<BicycleListing />} />
            {/* Hier wird der user-Prop übergeben: */}

            <Route path="/vehicles/cars/listing" element={<CarListing />} />

            <Route path="/vehicles/motorbikes/listing" element={<MotorbikeListing />} />
            <Route path="/vehicles/:vehicleType/listing/create" element={<CreateVehicleListingPage />} />

            <Route path="/vehicles/:vehicleType/listing/:vehicleId/payment" element={<VehiclePaymentPage />} />

            <Route path="/vehicles/bicycles/listing/:vehicleId" element={<VehicleListingDetailPage vehicleType="bicycles" user={auth.user} />} />
            <Route path="/vehicles/cars/listing/:vehicleId" element={<VehicleListingDetailPage vehicleType="cars" user={auth.user} />} />
            <Route path="/vehicles/motorbikes/listing/:vehicleId" element={<VehicleListingDetailPage vehicleType="motorbikes" user={auth.user} />} />

            {/* Fallback für unbekannte URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
