import { Link } from 'react-router-dom';

export function ProfilePage({ user }) {
  return (
    <div className="card profile-card">
      <h2>Dein Profil</h2>

      <div className="profile-details">
        <p>
          <strong>Username:</strong> {user?.username ? `@${user.username}` : 'Noch nicht festgelegt'}
        </p>
        <p><strong>E-Mail:</strong> {user?.email}</p>
      </div>

      <div className="profile-actions">
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
