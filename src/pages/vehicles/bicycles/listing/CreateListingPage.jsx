import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createVehicleListing } from '../../../../api/vehicles';

export function CreateBicycleListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', brand: '', model: '', year: '', price: '', description: '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await createVehicleListing({
        vehicleType: 'bicycles',
        payload: { ...formData, model: formData.model || null, year: formData.year ? Number(formData.year) : null, price: Number(formData.price) },
        files,
      });
      navigate('/vehicles/bicycles/listing');
    } catch (error) {
      setErrorMessage(error.message || 'Das Inserat konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ margin: '0 auto', textAlign: 'left', maxWidth: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Neues Fahrrad-Inserat</h2>
        <Link to="/vehicles/bicycles/listing"><button className="general_button">Abbrechen</button></Link>
      </div>
      {errorMessage && <p className="error" role="alert">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="listing-form">
        <label>Titel<input name="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} required /></label>
        <label>Marke<input name="brand" value={formData.brand} onChange={(event) => setFormData({ ...formData, brand: event.target.value })} required /></label>
        <label>Modell<input name="model" value={formData.model} onChange={(event) => setFormData({ ...formData, model: event.target.value })} /></label>
        <label>Baujahr<input type="number" min="1886" max="2100" name="year" value={formData.year} onChange={(event) => setFormData({ ...formData, year: event.target.value })} /></label>
        <label>Preis (€)<input type="number" min="0" step="0.01" name="price" value={formData.price} onChange={(event) => setFormData({ ...formData, price: event.target.value })} required /></label>
        <label>Beschreibung<textarea name="description" rows="4" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} /></label>
        <label>Bilder (optional, maximal 6)<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></label>
        <button type="submit" className="general_button" disabled={loading}>{loading ? 'Wird gespeichert …' : 'Inserat veröffentlichen'}</button>
      </form>
    </div>
  );
}
