import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function DashboardPage({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        
        {/* Profil (Klasse von signout-small auf was Eigenes geändert) */}
        <div className="profile-avatar-wrapper" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
          {user.picture ? (
            <img className="avatar-small" src={user.picture} alt="Profilbild" />
          ) : (
            <div className="avatar-small-placeholder">{user.name?.charAt(0)}</div>
          )}
        </div>

        {/* Rechte Header-Aktionen (Jetzt sauber mit nur einem Wrapper) */}
        <div className="header-actions">
          <Link to="/vehicles/bicycles/listing">
            <button className="signout-small">
              Fahrräder
            </button>
          </Link>


          <Link to="/vehicles/cars/listing">
            <button className="signout-small">
              Autos
            </button>
          </Link>


          <Link to="/vehicles/motorbikes/listing">
            <button className="signout-small">
              Motorräder
            </button>
          </Link>


          <button className="signout-small" onClick={onSignOut}>
            Abmelden
          </button>
        </div>


      </header>

      <main className="page">
        {activeTab === 'dashboard' ? (
          <section className="card">
            <h2>Deine App</h2>
            <p className="intro">Hier kannst du deine zukünftigen Inhalte einbauen.</p>
          </section>
        ) : (
          <section className="card">
            <button onClick={() => setActiveTab('dashboard')} className="back-btn">← Zurück</button>
            <h2>Dein Profil</h2>
            <img className="avatar" src={user.picture} alt="Profil" />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>E-Mail:</strong> {user.email}</p>
          </section>
        )}
      </main>
    </div>
  );
}