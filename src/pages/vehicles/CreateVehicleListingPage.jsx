import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { createVehicleListing } from '../../api/vehicles';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';

const INITIAL_FORM_DATA = { title: '', brand: '', model: '', year: '', power: '', price: '', description: '' };

export function CreateVehicleListingPage() {
  const { vehicleType } = useParams();
  const navigate = useNavigate();
  const configuration = VEHICLE_TYPES[vehicleType];
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!configuration) return <Navigate to="/" replace />;

  function changeField(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const payload = {
      title: formData.title,
      brand: formData.brand,
      model: configuration.fields.model ? formData.model || null : null,
      year: configuration.fields.year && formData.year ? Number(formData.year) : null,
      power: configuration.fields.power && formData.power ? Number(formData.power) : null,
      price: Number(formData.price),
      description: formData.description,
    };

    try {
      const listing = await createVehicleListing({ vehicleType, payload, files });
      navigate(`/vehicles/${vehicleType}/listing/${listing.id}/payment`);
    } catch (error) {
      setErrorMessage(error.message || 'Das Inserat konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card create-listing-card">
      <div className="form-page-header">
        <h2>{configuration.createTitle}</h2>
        <Link to={configuration.listingPath}><button className="general_button">Abbrechen</button></Link>
      </div>
      {errorMessage && <p className="error" role="alert">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="listing-form">
        <label>Titel<input name="title" value={formData.title} onChange={changeField} required /></label>
        <label>Marke<input name="brand" value={formData.brand} onChange={changeField} required /></label>
        {configuration.fields.model && <label>Modell<input name="model" value={formData.model} onChange={changeField} required={configuration.fields.modelRequired} /></label>}
        {configuration.fields.year && <label>Baujahr<input type="number" min="1886" max="2100" name="year" value={formData.year} onChange={changeField} /></label>}
        {configuration.fields.power && <label>Leistung (PS)<input type="number" min="0" max="5000" name="power" value={formData.power} onChange={changeField} /></label>}
        <label>Preis (CHF)<input type="number" min="0" step="0.01" name="price" value={formData.price} onChange={changeField} required /></label>
        <label>Beschreibung<textarea name="description" rows="4" value={formData.description} onChange={changeField} /></label>
        <label>Bilder (optional, maximal 6)<input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></label>
        <button type="submit" className="general_button" disabled={loading}>{loading ? 'Entwurf wird gespeichert …' : 'Weiter zur Bezahlung'}</button>
      </form>
    </div>
  );
}
