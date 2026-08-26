import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProfileListings } from '../api/vehicles';

const VEHICLE_TYPE_LABELS = {
  bicycles: 'Fahrrad',
  cars: 'Auto',
  motorbikes: 'Motorrad',
};

export function ProfileListingsPage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getProfileListings()
      .then((data) => {
        if (active) setListings(data);
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
  }, []);

  return (
    <div className="card vehicle-listings-card">
      <div className="profile-listings-header">
        <h2>Meine Inserate</h2>
        <Link to="/profile">
          <button className="general_button">Zurück zum Profil</button>
        </Link>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? (
        <p>Inserate werden geladen …</p>
      ) : listings.length === 0 ? (
        <p className="intro">Du hast noch keine Inserate erstellt.</p>
      ) : (
        <>
          <p className="intro">{listings.length} eigene{listings.length === 1 ? 's' : ''} Inserat{listings.length === 1 ? '' : 'e'}</p>
          <div className="vehicle-list-grid">
            {listings.map((listing) => (
              <Link
                className="vehicle-listing-link"
                to={`/vehicles/${listing.vehicle_type}/listing/${listing.id}`}
                key={`${listing.vehicle_type}-${listing.id}`}
              >
              <article className="vehicle-listing">
                {listing.images?.[0]?.url ? (
                  <img src={listing.images[0].url} alt={listing.title} className="vehicle-listing-image" />
                ) : (
                  <div className="vehicle-listing-image vehicle-listing-image-placeholder">Kein Bild</div>
                )}
                <span className="vehicle-type-label">{VEHICLE_TYPE_LABELS[listing.vehicle_type]}</span>
                <h3>{listing.title}</h3>
                <p>{listing.brand}{listing.model ? ` ${listing.model}` : ''}{listing.year ? ` (${listing.year})` : ''}</p>
                <strong>€ {Number(listing.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
              </article>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
