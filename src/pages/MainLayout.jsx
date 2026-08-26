import { useNavigate, Outlet } from 'react-router-dom';

export function MainLayout({ user, onSignOut }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* 
        Mit backgroundColor und border siehst du den Header sofort. 
        Später kannst du das einfach wieder löschen! 
      */}
      <header 
        className="dashboard-header" 
        style={{ backgroundColor: '#6ac8ff', borderBottom: '3px solid blue' }}
      >
        {/* 1. Profil (ganz links) */}
        <div 
          className="profile-avatar-wrapper" 
          onClick={() => navigate('/profile')} 
          style={{ cursor: 'pointer' }}
        >
          {user?.picture ? (
            <img className="avatar-small" src={user.picture} alt="Profilbild" />
          ) : (
            <div className="avatar-small-placeholder">{user?.name?.charAt(0)}</div>
          )}
        </div>

        {/* Platzhalter in der Mitte */}
        <div></div>

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
