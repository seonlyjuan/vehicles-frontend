import { Link } from 'react-router-dom';

export function ProfilePage({ user }) {
  return (
    <div className="card" style={{ margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Dein Profil</h2>
        
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="general_button">
            ← Zurück zum Dashboard
          </button>
        </Link>
      </div>

      <div style={{ margin: '20px 0' }}>
        <p style={{ margin: '0 0 8px 0' }}><strong>Name:</strong> {user?.name}</p>
        <p style={{ margin: '0 0 8px 0' }}>
          <strong>Username:</strong> {user?.username ? `@${user.username}` : 'Noch nicht festgelegt'}
        </p>
        <p style={{ margin: 0 }}><strong>E-Mail:</strong> {user?.email}</p>
      </div>

      <Link to="/profile/username" className="username-edit-link">
        <button className="general_button">
          {user?.username ? 'Username ändern' : 'Username festlegen'}
        </button>
      </Link>

      <div>
        <Link to="/profile/listings">
          <button className="general_button">Meine Inserate</button>
        </Link>
      </div>

      <section className="create-listing-section" aria-labelledby="create-listing-heading">
        <h3 id="create-listing-heading">Inserat erstellen</h3>
        <p>Wähle die Kategorie für dein neues Inserat.</p>
        <div className="create-listing-actions">
          <Link to="/vehicles/bicycles/listing/create">
            <button className="general_button">Fahrrad-Inserat erstellen</button>
          </Link>
          <Link to="/vehicles/cars/listing/create">
            <button className="general_button">Auto-Inserat erstellen</button>
          </Link>
          <Link to="/vehicles/motorbikes/listing/create">
            <button className="general_button">Motorrad-Inserat erstellen</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
