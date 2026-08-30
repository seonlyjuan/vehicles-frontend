import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProfileListings } from '../../api/vehicles';
import { ListingManagementActions } from '../../components/vehicles/ListingManagementActions';
import { formatCurrency } from '../../utils/formatCurrency';

const VEHICLE_TYPE_LABELS = {
  bicycles: 'Fahrrad',
  cars: 'Auto',
  motorbikes: 'Motorrad',
};

const STATUS_LABELS = {
  draft: 'Entwurf', active: 'Aktiv', sold: 'Verkauft', archived: 'Archiviert',
  expired: 'Abgelaufen', suspended: 'Gesperrt',
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
            {listings.map((listing, index) => (
              <article className="vehicle-listing" key={`${listing.vehicle_type}-${listing.id}`}>
                <Link
                  className="vehicle-listing-link"
                  to={listing.status === 'draft'
                    ? `/vehicles/${listing.vehicle_type}/listing/${listing.id}/payment`
                    : `/vehicles/${listing.vehicle_type}/listing/${listing.id}`}
                >
                {listing.images?.[0]?.url ? (
                  <img src={listing.images[0].url} alt={listing.title} className="vehicle-listing-image" />
                ) : (
                  <div className="vehicle-listing-image vehicle-listing-image-placeholder">Kein Bild</div>
                )}
                <span className="vehicle-type-label">{VEHICLE_TYPE_LABELS[listing.vehicle_type]}</span>
                <span className="vehicle-draft-label">{STATUS_LABELS[listing.status] ?? listing.status}</span>
                <h3>{listing.title}</h3>
                <p>{listing.brand}{listing.model ? ` ${listing.model}` : ''}{listing.year ? ` (${listing.year})` : ''}</p>
                <strong>{formatCurrency(listing.price)}</strong>
                </Link>
                <ListingManagementActions
                  listing={listing}
                  onChange={(updated) => setListings((current) => current.map((item, itemIndex) => (
                    itemIndex === index ? { ...item, ...updated } : item
                  )))}
                  onDelete={() => setListings((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                  onError={setError}
                />
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
