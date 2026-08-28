import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createVehicleListing } from '../../../../api/vehicles';

export function CreateCarListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', brand: '', model: '', year: '', power: '', price: '', description: '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const listing = await createVehicleListing({
        vehicleType: 'cars',
        payload: { ...formData, year: formData.year ? Number(formData.year) : null, power: formData.power ? Number(formData.power) : null, price: Number(formData.price) },
        files,
      });
      navigate(`/vehicles/cars/listing/${listing.id}/payment`);
    } catch (error) {
      setErrorMessage(error.message || 'Das Inserat konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card create-listing-card">
      <div className="form-page-header">
        <h2>Neues Auto-Inserat</h2>
        <Link to="/vehicles/cars/listing"><button className="general_button">Abbrechen</button></Link>
      </div>
      {errorMessage && <p className="error" role="alert">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="listing-form">
        <label>Titel<input name="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} required /></label>
        <label>Marke<input name="brand" value={formData.brand} onChange={(event) => setFormData({ ...formData, brand: event.target.value })} required /></label>
        <label>Modell<input name="model" value={formData.model} onChange={(event) => setFormData({ ...formData, model: event.target.value })} required /></label>
        <label>Baujahr<input type="number" min="1886" max="2100" name="year" value={formData.year} onChange={(event) => setFormData({ ...formData, year: event.target.value })} /></label>
        <label>Leistung (PS)<input type="number" min="0" max="5000" name="power" value={formData.power} onChange={(event) => setFormData({ ...formData, power: event.target.value })} /></label>
        <label>Preis (€)<input type="number" min="0" step="0.01" name="price" value={formData.price} onChange={(event) => setFormData({ ...formData, price: event.target.value })} required /></label>
        <label>Beschreibung<textarea name="description" rows="4" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} /></label>
        <label>Bilder (optional, maximal 6)<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></label>
        <button type="submit" className="general_button" disabled={loading}>{loading ? 'Entwurf wird gespeichert …' : 'Weiter zur Bezahlung'}</button>
      </form>
    </div>
  );
}
