import React from 'react';
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '20px 0' }}>
        {user?.picture ? (
          <img className="avatar" src={user.picture} alt="Profil" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        ) : (
          <div className="avatar-small-placeholder" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
            {user?.name?.charAt(0)}
          </div>
        )}
        <div>
          <p style={{ margin: '0 0 8px 0' }}><strong>Name:</strong> {user?.name}</p>
          <p style={{ margin: 0 }}><strong>E-Mail:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
}