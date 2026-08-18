// client/src/pages/listing/ListingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export function ListingPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Alle Listings</h1>
      <p>Hier siehst du eine Übersicht deiner Listings.</p>
      
      {/* Link zur Erstellungsseite */}
      <Link to="/listing/create">
        <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Inserat erstellen
        </button>
      </Link>
    </div>
  );
}