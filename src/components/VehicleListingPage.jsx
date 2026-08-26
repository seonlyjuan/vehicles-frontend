import { useEffect, useState } from 'react';

import { getVehicleListings } from '../api/vehicles';

export function VehicleListingPage({ vehicleType, title }) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, total_pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getVehicleListings(vehicleType, page)
      .then((data) => {
        if (active) setResult(data);
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
  }, [vehicleType, page]);

  function changePage(nextPage) {
    setIsLoading(true);
    setError('');
    setPage(nextPage);
  }

  return (
    <div className="card vehicle-listings-card">
      <h2>{title}</h2>
      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? (
        <p>Inserate werden geladen …</p>
      ) : result.items.length === 0 ? (
        <p className="intro">Noch keine Inserate vorhanden.</p>
      ) : (
        <>
          <p className="intro">{result.total} Inserat{result.total === 1 ? '' : 'e'} gefunden</p>
          <div className="vehicle-list-grid">
            {result.items.map((listing) => (
              <article className="vehicle-listing" key={listing.id}>
                {listing.images?.[0]?.url ? (
                  <img src={listing.images[0].url} alt={listing.title} className="vehicle-listing-image" />
                ) : (
                  <div className="vehicle-listing-image vehicle-listing-image-placeholder">Kein Bild</div>
                )}
                <h3>{listing.title}</h3>
                <p>{listing.brand}{listing.model ? ` ${listing.model}` : ''}{listing.year ? ` (${listing.year})` : ''}</p>
                <strong>€ {Number(listing.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
              </article>
            ))}
          </div>
        </>
      )}
      {result.total_pages > 1 && (
        <nav className="pagination" aria-label="Seitennavigation">
          <button className="general_button" onClick={() => changePage(page - 1)} disabled={page === 1}>Zurück</button>
          <span>Seite {page} von {result.total_pages}</span>
          <button className="general_button" onClick={() => changePage(page + 1)} disabled={page === result.total_pages}>Weiter</button>
        </nav>
      )}
    </div>
  );
}
