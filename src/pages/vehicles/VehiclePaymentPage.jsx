import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCurrentTerms } from '../../api/legal';
import { createRefundRequest } from '../../api/payments';
import { getVehiclePaymentStatus, publishVehicleListing } from '../../api/vehicles';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';
import { formatCurrency } from '../../utils/formatCurrency';

const VALID_VEHICLE_TYPES = new Set(Object.keys(VEHICLE_TYPES));
const REFUND_STATUS_LABELS = {
  requested: 'Antrag wird geprüft',
  approved: 'Rückerstattung genehmigt',
  completed: 'Rückerstattung abgeschlossen',
};

export function VehiclePaymentPage() {
  const { vehicleType, vehicleId } = useParams();
  const navigate = useNavigate();
  const isValidVehicleType = VALID_VEHICLE_TYPES.has(vehicleType);
  const [payment, setPayment] = useState(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isChecking, setIsChecking] = useState(isValidVehicleType);
  const [isPublishing, setIsPublishing] = useState(false);
  const [terms, setTerms] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoadingTerms, setIsLoadingTerms] = useState(isValidVehicleType);
  const [termsError, setTermsError] = useState('');
  const [error, setError] = useState(isValidVehicleType ? '' : 'Unbekannter Fahrzeugtyp.');
  const [refundReason, setRefundReason] = useState('');
  const [isRequestingRefund, setIsRequestingRefund] = useState(false);
  const [refundMessage, setRefundMessage] = useState('');

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
        setPayment(result);
        setIsPaymentSuccessful(result.successful);
        setError('');
        setIsChecking(false);
        if (result.payment_status === 'pending') timer = window.setTimeout(checkPayment, 2500);
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

  async function handleRefundRequest(event) {
    event.preventDefault();
    if (!payment?.payment_id || refundReason.trim().length < 10) {
      setError('Bitte beschreibe den Rückerstattungsgrund mit mindestens 10 Zeichen.');
      return;
    }
    setIsRequestingRefund(true);
    setError('');
    setRefundMessage('');
    try {
      const refundRequest = await createRefundRequest(payment.payment_id, refundReason.trim());
      setPayment((current) => ({ ...current, refund_request: refundRequest }));
      setRefundReason('');
      setRefundMessage('Dein Rückerstattungsantrag wurde zur Prüfung eingereicht.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsRequestingRefund(false);
    }
  }

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

  const refundRequest = payment?.refund_request;
  const canCreateRefund = isPaymentSuccessful && payment?.payment_id
    && (!refundRequest || refundRequest.status === 'rejected');

  return (
    <div className="card payment-card">
      <span className="payment-icon" aria-hidden="true">{VEHICLE_TYPES[vehicleType]?.emoji ?? '✓'}</span>
      <h2>Zahlung und Rückerstattung</h2>
      <p className="intro">Hier wird später die Bezahlung mit TWINT über Payrexx durchgeführt.</p>

      <section className="payment-placeholder" aria-label="Platzhalter für die Bezahlung">
        <strong>Payrexx / TWINT</strong>
        <p>Zahlungsintegration folgt später.</p>
      </section>

      {payment?.price && (
        <section className="payment-summary" aria-labelledby="payment-summary-title">
          <h3 id="payment-summary-title">Preisübersicht</h3>
          <dl>
            <div><dt>Nettopreis</dt><dd>{formatCurrency(payment.price.net_amount)}</dd></div>
            <div><dt>MWST ({Number(payment.price.vat_rate_percent).toLocaleString('de-CH')} %)</dt><dd>{formatCurrency(payment.price.vat_amount)}</dd></div>
            <div className="payment-summary-total"><dt>Gesamtpreis</dt><dd>{formatCurrency(payment.price.gross_amount)}</dd></div>
          </dl>
          <small>Alle Beträge in {payment.currency}.</small>
        </section>
      )}

      <div className={`payment-status ${isPaymentSuccessful ? 'payment-status-success' : ''}`} role="status" aria-live="polite">
        {isChecking
          ? 'Zahlungsstatus wird geprüft …'
          : ({
            paid: 'Zahlung erfolgreich bestätigt.',
            refunded: 'Zahlung wurde zurückerstattet.',
            failed: 'Zahlung ist fehlgeschlagen.',
            pending: 'Zahlung steht noch aus.',
          })[payment?.payment_status] ?? 'Zahlung steht noch aus.'}
      </div>

      {isPaymentSuccessful && payment?.confirmation_email_status && (
        <p className="payment-email-note">
          {payment.confirmation_email_status === 'sent'
            ? 'Die Zahlungsbestätigung wurde per E-Mail versendet.'
            : 'Die Zahlungsbestätigung wurde für den E-Mail-Versand vorgemerkt.'}
        </p>
      )}

      {payment?.listing_status === 'draft' && (
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
      )}

      {payment?.payment_id && ['paid', 'refunded'].includes(payment.payment_status) && (
        <section className="refund-section" aria-labelledby="refund-title">
          <h3 id="refund-title">Rückerstattung</h3>
          {!canCreateRefund ? (
            <div className={`refund-status refund-status-${refundRequest?.status ?? 'unavailable'}`} role="status">
              <strong>{REFUND_STATUS_LABELS[refundRequest?.status] ?? 'Rückerstattung nicht verfügbar'}</strong>
              {refundRequest?.status === 'approved' ? (
                <p>Die Rückzahlung steht noch aus und wird erst durch den Zahlungsanbieter bestätigt.</p>
              ) : (
                <p>{refundRequest?.reason}</p>
              )}
              {refundRequest?.decision_note && <small>Entscheid: {refundRequest.decision_note}</small>}
            </div>
          ) : (
            <form className="refund-form" onSubmit={handleRefundRequest}>
              {refundRequest?.status === 'rejected' && (
                <p className="refund-rejected">Der letzte Antrag wurde abgelehnt: {refundRequest.decision_note || 'Keine Begründung angegeben.'}</p>
              )}
              <label htmlFor="refund-reason">Grund für die Rückerstattung</label>
              <textarea
                id="refund-reason"
                value={refundReason}
                onChange={(event) => setRefundReason(event.target.value)}
                minLength="10"
                maxLength="1000"
                rows="4"
                required
              />
              <small>Der Antrag wird geprüft und führt noch nicht automatisch zu einer Rückzahlung.</small>
              <button className="general_button" disabled={isRequestingRefund} type="submit">
                {isRequestingRefund ? 'Wird eingereicht …' : 'Rückerstattung beantragen'}
              </button>
            </form>
          )}
          {refundMessage && <p className="success" role="status">{refundMessage}</p>}
        </section>
      )}

      {error && <p className="error" role="alert">{error}</p>}

      <div className="payment-actions">
        <Link to="/profile/listings"><button className="general_button" type="button">Zurück zu meinen Inseraten</button></Link>
        {payment?.listing_status === 'draft' && (
          <button className="general_button payment-publish-button" type="button" disabled={!isPaymentSuccessful || !termsAccepted || !terms || isPublishing} onClick={handlePublish}>
            {isPublishing ? 'Wird veröffentlicht …' : 'Inserat veröffentlichen'}
          </button>
        )}
      </div>
    </div>
  );
}
