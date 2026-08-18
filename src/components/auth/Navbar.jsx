export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2>Meine App</h2>
      </div>
      
      <div className="navbar-right">
        {/* Kontosymbol / Profilbereich */}
        <div className="account-menu">
          {user?.picture ? (
            <img src={user.picture} alt="Profilbild" className="account-avatar" />
          ) : (
            <div className="account-avatar-placeholder">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <span className="account-name">{user?.name || 'Konto'}</span>
          
          {/* Beispiel für einen Logout-Button, der beim Konto liegen kann */}
          {onLogout && (
            <button onClick={onLogout} className="logout-btn">
              Abmelden
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
