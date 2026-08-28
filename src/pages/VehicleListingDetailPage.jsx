import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getVehicleListing, updateVehicleImageOrder } from '../api/vehicles';

const VEHICLE_TYPE_LABELS = {
  bicycles: 'Fahrrad',
  cars: 'Auto',
  motorbikes: 'Motorrad',
};

export function VehicleListingDetailPage({ vehicleType, user }) {
  const { vehicleId } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReordering, setIsReordering] = useState(false);

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
          <span className="vehicle-type-label">{VEHICLE_TYPE_LABELS[vehicleType]}</span>
          <h2>{listing.title}</h2>

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
          <p><strong>Preis:</strong> € {Number(listing.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</p>

          <section className="vehicle-description">
            <h3>Beschreibung</h3>
            <p>{listing.description || 'Keine Beschreibung vorhanden.'}</p>
          </section>
        </article>
      )}
    </div>
  );
}
