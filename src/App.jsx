// client/src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { DashboardPage } from './pages/general/DashboardPage';
import { MainLayout } from './pages/general/MainLayout';
import { NotificationsPage } from './pages/general/NotificationsPage';
import { ConversationPage } from './pages/messages/ConversationPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { ModerationPage } from './pages/moderation/ModerationPage';
import { LoginPage } from './pages/profile/LoginPage';
import { ProfileListingsPage } from './pages/profile/ProfileListingsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ProfileSettingsPage } from './pages/profile/ProfileSettingsPage';
import { UsernamePage } from './pages/profile/UsernamePage';
import { CreateVehicleListingPage } from './pages/vehicles/CreateVehicleListingPage';
import { EditVehicleListingPage } from './pages/vehicles/EditVehicleListingPage';
import { VehicleListingDetailPage } from './pages/vehicles/VehicleListingDetailPage';
import { VehicleListingsPage } from './pages/vehicles/VehicleListingsPage';
import { VehiclePaymentPage } from './pages/vehicles/VehiclePaymentPage';

import './styles/auth.css';
import './styles/legal.css';
import './styles/platform.css';

const ImprintPage = lazy(() => import('./pages/legal/ImprintPage')
  .then((module) => ({ default: module.ImprintPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage')
  .then((module) => ({ default: module.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/legal/TermsPage')
  .then((module) => ({ default: module.TermsPage })));

function renderLegalPage(PageComponent) {
  return (
    <Suspense fallback={<main className="auth-initializing" role="status">Dokument wird geladen …</main>}>
      <PageComponent />
    </Suspense>
  );
}

function App() {
  const auth = useGoogleAuth();

  const isLegalPage = window.location.pathname.startsWith('/legal/');

  if (auth.isInitializing && !isLegalPage) {
    return (
      <main className="auth-initializing" role="status" aria-label="Anmeldung wird geprüft">
        <div className="auth-spinner" aria-hidden="true" />
      </main>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/legal/impressum" element={renderLegalPage(ImprintPage)} />
        <Route path="/legal/datenschutz" element={renderLegalPage(PrivacyPolicyPage)} />
        <Route path="/legal/agb" element={renderLegalPage(TermsPage)} />

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
            <Route path="/profile/settings" element={<ProfileSettingsPage auth={auth} />} />
            <Route path="/messages" element={<MessagesPage user={auth.user} />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages/:conversationId" element={<ConversationPage user={auth.user} />} />
            {['moderator', 'admin'].includes(auth.user.platform_role) && (
              <Route path="/moderation" element={<ModerationPage />} />
            )}

            <Route path="/vehicles/:vehicleType/listing" element={<VehicleListingsPage />} />
            <Route path="/vehicles/:vehicleType/listing/create" element={<CreateVehicleListingPage />} />

            <Route path="/vehicles/:vehicleType/listing/:vehicleId/payment" element={<VehiclePaymentPage />} />
            <Route path="/vehicles/:vehicleType/listing/:vehicleId/edit" element={<EditVehicleListingPage />} />

            <Route path="/vehicles/:vehicleType/listing/:vehicleId" element={<VehicleListingDetailPage user={auth.user} />} />

            {/* Fallback für unbekannte URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
