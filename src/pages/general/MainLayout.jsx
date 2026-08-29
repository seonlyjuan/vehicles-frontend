import { Outlet, useNavigate } from 'react-router-dom';

export function MainLayout({ onSignOut }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* 
        Mit backgroundColor und border siehst du den Header sofort. 
        Später kannst du das einfach wieder löschen! 
      */}
      <header className="dashboard-header">
        {/* 1. Profil (ganz links) */}
        <div className="header-left">
          <button className="general_button" onClick={() => navigate('/profile')}>
            Profil
          </button>
          <button className="general_button" onClick={() => navigate('/messages')}>
            Nachrichten
          </button>
        </div>

        {/* Home (zentriert) */}
        <div className="header-center">
          <button className="general_button" onClick={() => navigate('/')}>
            Home
          </button>
        </div>

        {/* 2. Abmelden-Button (ganz rechts) */}
        <div className="header-right">
          <button className="general_button" onClick={onSignOut}>
            Abmelden
          </button>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
