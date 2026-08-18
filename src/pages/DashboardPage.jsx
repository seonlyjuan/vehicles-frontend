import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function DashboardPage({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        
        {/* Profil*/}
        <div className="signout-small" onClick={() => setActiveTab('profile')}>
          {user.picture ? (
            <img className="avatar-small" src={user.picture} alt="Profilbild" />
          ) : (
            <div className="avatar-small-placeholder">{user.name?.charAt(0)}</div>
          )}

        </div>

        {/* Rechte Header-Aktionen (Buttons) */}
        <div className="header-actions">
          <Link to="/listing">
            <button className="signout-small">
              Inserate
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