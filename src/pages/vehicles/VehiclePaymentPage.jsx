import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCurrentTerms } from '../../api/legal';
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
  const [terms, setTerms] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoadingTerms, setIsLoadingTerms] = useState(isValidVehicleType);
  const [termsError, setTermsError] = useState('');
  const [error, setError] = useState(isValidVehicleType ? '' : 'Unbekannter Fahrzeugtyp.');

  useEffect(() => {
    if (!isValidVehicleType) return undefined;

    let active = true;
    void getCurrentTerms()
      .then((document) => {
        if (active) {
          setTerms(document);
          setTermsError('');
        }
      })
      .catch((requestError) => {
        if (active) setTermsError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoadingTerms(false);
      });

    return () => { active = false; };
  }, [isValidVehicleType]);

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
    if (!terms || !termsAccepted) {
      setError('Bitte lies und akzeptiere zuerst die aktuellen AGB.');
      return;
    }
    setIsPublishing(true);
    setError('');
    try {
      await publishVehicleListing(vehicleType, vehicleId, terms.version);
      navigate(`/vehicles/${vehicleType}/listing/${vehicleId}`, { replace: true });
    } catch (publishError) {
      setError(publishError.message);
      setTermsAccepted(false);
      try {
        setTerms(await getCurrentTerms());
      } catch (requestError) {
        setTermsError(requestError.message);
      }
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

      <section className="terms-confirmation" aria-labelledby="terms-confirmation-title">
        <h3 id="terms-confirmation-title">AGB vor der Veröffentlichung bestätigen</h3>
        {isLoadingTerms && <p>Aktuelle AGB-Version wird geladen …</p>}
        {termsError && <p className="error" role="alert">{termsError}</p>}
        {terms && <>
          <p>
            Öffne und lies die{' '}
            <Link to={terms.public_path} target="_blank" rel="noopener noreferrer">
              AGB ({terms.display_version})
            </Link>
            {' '}vor der Veröffentlichung.
          </p>
          {terms.status === 'draft' && (
            <p className="terms-draft-warning">Diese AGB-Version ist ein Entwurf und nur für den lokalen Testbetrieb vorgesehen.</p>
          )}
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />
            <span>Ich habe die AGB ({terms.display_version}) gelesen und akzeptiere sie für die Veröffentlichung dieses Inserats.</span>
          </label>
          <small>Version, Nutzer, Inserat und Zeitpunkt der Zustimmung werden protokolliert.</small>
        </>}
      </section>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="payment-actions">
        <Link to="/profile/listings"><button className="general_button" type="button">Später fortfahren</button></Link>
        <button className="general_button payment-publish-button" type="button" disabled={!isPaymentSuccessful || !termsAccepted || !terms || isPublishing} onClick={handlePublish}>
          {isPublishing ? 'Wird veröffentlicht …' : 'Inserat veröffentlichen'}
        </button>
      </div>
    </div>
  );
}
