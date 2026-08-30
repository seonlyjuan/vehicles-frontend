import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { getVehicleListing, updateVehicleListing } from '../../api/vehicles';
import { VehicleFormFields } from '../../components/vehicles/VehicleFormFields';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';
import { EMPTY_VEHICLE_FORM, listingToVehicleForm, toVehiclePayload } from '../../utils/vehicleForm';

export function EditVehicleListingPage() {
  const { vehicleType, vehicleId } = useParams();
  const navigate = useNavigate();
  const configuration = VEHICLE_TYPES[vehicleType];
  const [formData, setFormData] = useState(EMPTY_VEHICLE_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    if (!configuration) return undefined;
    getVehicleListing(vehicleType, vehicleId)
      .then((listing) => { if (active) setFormData(listingToVehicleForm(listing)); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [configuration, vehicleId, vehicleType]);

  if (!configuration) return <Navigate to="/" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      await updateVehicleListing(vehicleType, vehicleId, toVehiclePayload(formData, configuration));
      navigate(`/vehicles/${vehicleType}/listing/${vehicleId}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) return <div className="card"><p>Inserat wird geladen …</p></div>;
  return (
    <div className="card create-listing-card">
      <div className="form-page-header">
        <h2>Inserat bearbeiten</h2>
        <Link to={`/vehicles/${vehicleType}/listing/${vehicleId}`}><button className="general_button">Abbrechen</button></Link>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <form className="listing-form" onSubmit={handleSubmit}>
        <VehicleFormFields
          configuration={configuration}
          values={formData}
          onChange={(event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))}
          onLocationChange={(location) => setFormData((current) => ({ ...current, ...location }))}
        />
        <button className="general_button primary-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Wird gespeichert …' : 'Änderungen speichern'}
        </button>
      </form>
    </div>
  );
}
