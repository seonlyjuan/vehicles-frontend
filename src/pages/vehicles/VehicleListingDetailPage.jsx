import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { startConversation } from '../../api/messages';
import { changeVehicleListingStatus, deleteVehicleListing, getVehicleListing, updateVehicleImageOrder } from '../../api/vehicles';
import { ReportContent } from '../../components/safety/ReportContent';
import { getVehicleConditionLabel } from '../../config/vehicleConditions';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export function VehicleListingDetailPage({ user }) {
  const { vehicleType, vehicleId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReordering, setIsReordering] = useState(false);
  const [isStartingConversation, setIsStartingConversation] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  useEffect(() => {
    let active = true;

    getVehicleListing(vehicleType, vehicleId)
      .then((data) => {
        if (active) setListing(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [vehicleId, vehicleType]);

  async function moveImage(index, direction) {
    const nextIndex = index + direction;
    if (!listing || nextIndex < 0 || nextIndex >= listing.images.length) return;

    const previousImages = listing.images;
    const nextImages = [...previousImages];
    [nextImages[index], nextImages[nextIndex]] = [nextImages[nextIndex], nextImages[index]];
    setListing({ ...listing, images: nextImages });
    setError('');
    setIsReordering(true);

    try {
      await updateVehicleImageOrder(vehicleType, vehicleId, nextImages.map((image) => image.id));
    } catch (requestError) {
      setListing({ ...listing, images: previousImages });
      setError(requestError.message);
    } finally {
      setIsReordering(false);
    }
  }

  async function contactSeller() {
    setIsStartingConversation(true);
    setError('');
    try {
      const conversation = await startConversation(vehicleType, vehicleId);
      navigate(`/messages/${conversation.id}`);
    } catch (requestError) {
      setError(requestError.message);
      setIsStartingConversation(false);
    }
  }

  async function changeStatus(action) {
    setIsChangingStatus(true);
    setError('');
    try {
      const updated = await changeVehicleListingStatus(vehicleType, vehicleId, action);
      setListing((current) => ({ ...current, ...updated }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsChangingStatus(false);
    }
  }

  async function removeListing() {
    if (!window.confirm('Inserat wirklich löschen? Die Bilder werden sofort entfernt.')) return;
    setIsChangingStatus(true);
    try {
      await deleteVehicleListing(vehicleType, vehicleId);
      navigate('/profile/listings');
    } catch (requestError) {
      setError(requestError.message);
      setIsChangingStatus(false);
    }
  }

  if (isLoading) return <div className="card"><p>Inserat wird geladen …</p></div>;

  return (
    <div className="card vehicle-detail-card">
      <Link to={`/vehicles/${vehicleType}/listing`}>
        <button className="general_button">Zurück zu den Inseraten</button>
      </Link>

      {error ? (
        <p className="error" role="alert">{error}</p>
      ) : listing && (
        <article>
          <span className="vehicle-type-label">{VEHICLE_TYPES[vehicleType]?.detailLabel}</span>
          <h2>{listing.title}</h2>
          {listing.profile_id === user?.id && (
            <div className="listing-owner-actions">
              <Link to={`/vehicles/${vehicleType}/listing/${vehicleId}/edit`}><button className="general_button">Bearbeiten</button></Link>
              {listing.status === 'active' && <button className="general_button" disabled={isChangingStatus} onClick={() => changeStatus('archive')}>Archivieren</button>}
              {listing.status === 'active' && <button className="general_button" disabled={isChangingStatus} onClick={() => changeStatus('mark_sold')}>Als verkauft markieren</button>}
              {listing.status === 'archived' && <button className="general_button" disabled={isChangingStatus} onClick={() => changeStatus('reactivate')}>Reaktivieren</button>}
              <button className="general_button danger-button" disabled={isChangingStatus} onClick={removeListing}>Löschen</button>
            </div>
          )}
          {listing.profile_id !== user?.id && (
            <div className="public-listing-actions">
              <button className="general_button contact-seller-button" type="button" onClick={contactSeller} disabled={isStartingConversation}>
                {isStartingConversation ? 'Unterhaltung wird geöffnet …' : 'Verkäufer kontaktieren'}
              </button>
              <ReportContent
                label="Inserat melden"
                subject={{ subject_type: 'listing', vehicle_type: vehicleType, listing_id: vehicleId }}
              />
            </div>
          )}

          {listing.images?.length > 0 ? (
            <div className="vehicle-detail-images">
              {listing.images.map((image, index) => (
                <div className="vehicle-detail-image" key={image.id}>
                  <img src={image.url} alt={`${listing.title} – Bild ${index + 1}`} />
                  {listing.profile_id === user?.id && (
                    <div className="image-order-actions">
                      <button
                        className="general_button"
                        type="button"
                        aria-label={`Bild ${index + 1} nach links verschieben`}
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0 || isReordering}
                      >
                        ←
                      </button>
                      <span>{index === 0 ? 'Hauptbild' : ''}</span>
                      <button
                        className="general_button"
                        type="button"
                        aria-label={`Bild ${index + 1} nach rechts verschieben`}
                        onClick={() => moveImage(index, 1)}
                        disabled={index === listing.images.length - 1 || isReordering}
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="vehicle-detail-image-placeholder">Kein Bild vorhanden</div>
          )}

          <p><strong>Marke:</strong> {listing.brand}</p>
          {listing.model && <p><strong>Modell:</strong> {listing.model}</p>}
          {listing.year && <p><strong>Jahr:</strong> {listing.year}</p>}
          {listing.power != null && <p><strong>Leistung:</strong> {listing.power} PS</p>}
          <p><strong>Preis:</strong> {formatCurrency(listing.price)}</p>
          <p><strong>Standort:</strong> {listing.postal_code} {listing.locality}, {listing.canton}</p>
          <p><strong>Verkäufer:</strong> {listing.seller?.seller_type === 'dealer'
            ? `${listing.seller.company_name || 'Händler'}${listing.seller.is_verified_dealer ? ' (verifiziert)' : ''}`
            : 'Privatverkäufer'}</p>
          {listing.condition && <p><strong>Zustand:</strong> {getVehicleConditionLabel(listing.condition)}</p>}
          {listing.known_defects && <p><strong>Mängel:</strong> {listing.known_defects}</p>}
          {listing.mileage != null && <p><strong>Kilometer:</strong> {Number(listing.mileage).toLocaleString('de-CH')} km</p>}
          {listing.first_registration && <p><strong>Erstzulassung:</strong> {formatDate(listing.first_registration)}</p>}

          <section className="vehicle-description">
            <h3>Beschreibung</h3>
            <p>{listing.description || 'Keine Beschreibung vorhanden.'}</p>
          </section>
        </article>
      )}
    </div>
  );
}
