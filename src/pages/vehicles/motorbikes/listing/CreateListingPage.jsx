// client/src/pages/vehicles/motorbikes/listing/CreateListingPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function CreateMotorbikeListing({ user }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Payload: Supabase-UUID (profile_id) + Formulardaten für Motorräder
    const payload = {
      profile_id: user?.id, 
      ...formData
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/motorbikes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Motorrad-Inserats.');
      }

      const result = await response.json();
      console.log('Motorrad erfolgreich gespeichert:', result);

      navigate('/vehicles/motorbikes/listing');

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
        <h2 style={{ margin: 0 }}>Neues Motorrad-Inserat</h2>
        <Link to="/vehicles/motorbikes/listing" style={{ textDecoration: 'none' }}>
          <button className="general_button">← Abbrechen</button>
        </Link>
      </div>

      {errorMessage && (
        <p style={{ color: 'red', marginBottom: '16px' }}>{errorMessage}</p>
      )}

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
            placeholder="z.B. Yamaha MT-07 Naked Bike"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Marke:</label>
            <input 
              type="text" 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="z.B. Yamaha"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Modell:</label>
            <input 
              type="text" 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="z.B. MT-07"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Baujahr:</label>
            <input 
              type="number" 
              name="year" 
              value={formData.year} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="z.B. 2021"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Preis (€):</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="z.B. 6800"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Beschreibung:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Kilometerstand, TÜV, Zustand etc."
          />
        </div>

        <button 
          type="submit" 
          className="general_button" 
          disabled={loading}
          style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Wird gespeichert...' : 'Motorrad-Inserat veröffentlichen'}
        </button>
      </form>
    </div>
  );
}