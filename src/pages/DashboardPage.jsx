import { useState } from 'react';
import { Link } from 'react-router-dom';

export function DashboardPage({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      {activeTab === 'dashboard' ? (
        /* Die Fahrzeug-Buttons zentriert in der Seitenmitte */
        <section className="card vehicle-menu-card">
          <h2></h2>
          
          <div className="center-vehicle-buttons">
            <Link to="/vehicles/bicycles/listing">
              <button className="large-vehicle-btn">
                <span className="emoji">🚲</span>
                <span className="text">Fahrräder</span>
              </button>
            </Link>
            
            <Link to="/vehicles/cars/listing">
              <button className="large-vehicle-btn">
                <span className="emoji">🚗</span>
                <span className="text">Autos</span>
              </button>
            </Link>
            
            <Link to="/vehicles/motorbikes/listing">
              <button className="large-vehicle-btn">
                <span className="emoji">🏍️</span>
                <span className="text">Motorräder</span>
              </button>
            </Link>
          </div>
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
    </>
  );
}