import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { createVehicleListing } from '../../api/vehicles';
import { VehicleFormFields } from '../../components/vehicles/VehicleFormFields';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';
import { EMPTY_VEHICLE_FORM, toVehiclePayload } from '../../utils/vehicleForm';

export function CreateVehicleListingPage() {
  const { vehicleType } = useParams();
  const navigate = useNavigate();
  const configuration = VEHICLE_TYPES[vehicleType];
  const [formData, setFormData] = useState(EMPTY_VEHICLE_FORM);
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
    const payload = toVehiclePayload(formData, configuration);

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
        <VehicleFormFields
          configuration={configuration}
          values={formData}
          onChange={changeField}
          onLocationChange={(location) => setFormData((current) => ({ ...current, ...location }))}
          onFilesChange={(event) => setFiles(Array.from(event.target.files ?? []))}
        />
        <button type="submit" className="general_button" disabled={loading}>{loading ? 'Entwurf wird gespeichert …' : 'Weiter zur Bezahlung'}</button>
      </form>
    </div>
  );
}
