// client/src/pages/vehicles/bicycles/listing/CreateListingPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function CreateBicycleListing({ user }) {
  const navigate = useNavigate();

  // 1. Zustand für die Formularfelder
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Wertänderungen im Formular verarbeiten
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Formular absenden (JSON ans Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Payload: Supabase-UUID (profile_id) + Formulardaten
    const payload = {
      profile_id: user?.id, 
      ...formData
    };

    try {
      // Hier geht der Request jetzt an dein Backend auf Port 8000
      const response = await fetch('http://127.0.0.1:8000/api/bicycles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Inserats.');
      }

      const result = await response.json();
      console.log('Erfolgreich gespeichert:', result);

      // Zurück zur Listing-Übersicht
      navigate('/vehicles/bicycles/listing');

    } catch (err) {
      console.error(err);
      setErrorMessage('Das Inserat konnte nicht gespeichert werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ margin: '0 auto', textAlign: 'left', maxWidth: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Neues Fahrrad-Inserat</h2>
        <Link to="/vehicles/bicycles/listing" style={{ textDecoration: 'none' }}>
          <button className="general_button">← Abbrechen</button>
        </Link>
      </div>

      {errorMessage && (
        <p style={{ color: 'red', marginBottom: '16px' }}>{errorMessage}</p>
      )}

      {/* Das Formular */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Titel:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="z.B. Rennrad von Canyon"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Marke:</label>
          <input 
            type="text" 
            name="brand" 
            value={formData.brand} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="z.B. Canyon"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Preis (€):</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="z.B. 750"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Beschreibung:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Zustand, Zubehör etc."
          />
        </div>

        <button 
          type="submit" 
          className="general_button" 
          disabled={loading}
          style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Wird gespeichert...' : 'Inserat veröffentlichen'}
        </button>
      </form>
    </div>
  );
}