import React from 'react';
import { Link } from 'react-router-dom';

export function CarListing() {
  return (
    <div className="card" style={{ margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Auto-Listings</h2>
        
        <Link to="/vehicles/cars/listing/create" style={{ textDecoration: 'none' }}>
          <button className="general_button">
            + Inserat erstellen
          </button>
        </Link>
      </div>
      
      <p className="intro">Hier siehst du eine Übersicht deiner erstellten Auto-Inserate.</p>
      
      {/* Hier kommen später deine echten Listings hin */}
      <p style={{ color: '#666' }}>Noch keine Inserate vorhanden.</p>
    </div>
  );
}