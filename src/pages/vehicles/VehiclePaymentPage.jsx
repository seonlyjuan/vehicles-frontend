import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getVehiclePaymentStatus, publishVehicleListing } from '../../api/vehicles';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';

const VALID_VEHICLE_TYPES = new Set(Object.keys(VEHICLE_TYPES));

export function VehiclePaymentPage() {
  const { vehicleType, vehicleId } = useParams();
  const navigate = useNavigate();
  const isValidVehicleType = VALID_VEHICLE_TYPES.has(vehicleType);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isChecking, setIsChecking] = useState(isValidVehicleType);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(isValidVehicleType ? '' : 'Unbekannter Fahrzeugtyp.');

  useEffect(() => {
    if (!isValidVehicleType) return undefined;

    let active = true;
    let timer;

    async function checkPayment() {
      try {
        const result = await getVehiclePaymentStatus(vehicleType, vehicleId);
        if (!active) return;
        setIsPaymentSuccessful(result.successful);
        setError('');
        setIsChecking(false);
        if (!result.successful) timer = window.setTimeout(checkPayment, 2500);
      } catch (requestError) {
        if (!active) return;
        setError(requestError.message);
        setIsChecking(false);
        timer = window.setTimeout(checkPayment, 5000);
      }
    }

    void checkPayment();
    return () => {
      active = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [isValidVehicleType, vehicleId, vehicleType]);

  async function handlePublish() {
    setIsPublishing(true);
    setError('');
    try {
      await publishVehicleListing(vehicleType, vehicleId);
      navigate(`/vehicles/${vehicleType}/listing/${vehicleId}`, { replace: true });
    } catch (publishError) {
      setError(publishError.message);
      setIsPublishing(false);
    }
  }

  return (
    <div className="card payment-card">
      <span className="payment-icon" aria-hidden="true">{VEHICLE_TYPES[vehicleType]?.emoji ?? '✓'}</span>
      <h2>Inserat bezahlen</h2>
      <p className="intro">Hier wird später die Bezahlung mit TWINT über Payrexx durchgeführt.</p>

      <section className="payment-placeholder" aria-label="Platzhalter für die Bezahlung">
        <strong>Payrexx / TWINT</strong>
        <p>Zahlungsintegration folgt später.</p>
      </section>

      <div className={`payment-status ${isPaymentSuccessful ? 'payment-status-success' : ''}`} role="status" aria-live="polite">
        {isChecking ? 'Zahlungsstatus wird geprüft …' : isPaymentSuccessful ? 'Zahlung erfolgreich bestätigt.' : 'Zahlung steht noch aus.'}
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="payment-actions">
        <Link to="/profile/listings"><button className="general_button" type="button">Später fortfahren</button></Link>
        <button className="general_button payment-publish-button" type="button" disabled={!isPaymentSuccessful || isPublishing} onClick={handlePublish}>
          {isPublishing ? 'Wird veröffentlicht …' : 'Inserat veröffentlichen'}
        </button>
      </div>
    </div>
  );
}
