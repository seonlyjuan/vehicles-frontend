import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getVehicleFilterMetadata, getVehicleListings } from '../api/vehicles';
import { VEHICLE_TYPES } from '../config/vehicleTypes';
import { VehicleFilters } from './VehicleFilters';

export function VehicleListingPage({ vehicleType, title }) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, total_pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  useEffect(() => {
    let active = true;
    getVehicleFilterMetadata(vehicleType)
      .then((data) => {
        if (active) setCharacteristics(data.characteristics ?? []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });
    return () => { active = false; };
  }, [vehicleType]);

  useEffect(() => {
    let active = true;

    getVehicleListings(vehicleType, page, appliedFilters)
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
  }, [vehicleType, page, appliedFilters]);

  function changeFilter(event) {
    setFilterValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function applyFilters(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setPage(1);
    setAppliedFilters({ ...filterValues });
  }

  function resetFilters() {
    setIsLoading(true);
    setError('');
    setFilterValues({});
    setPage(1);
    setAppliedFilters({});
  }

  function changePage(nextPage) {
    setIsLoading(true);
    setError('');
    setPage(nextPage);
  }

  return (
    <div className="card vehicle-listings-card">
      <div className="vehicle-listings-header">
        <h2>{title}</h2>
        <button
          className="general_button filter-toggle"
          type="button"
          aria-expanded={areFiltersVisible}
          aria-controls={`${vehicleType}-filters`}
          onClick={() => setAreFiltersVisible((visible) => !visible)}
        >
          Filter
          <span className="filter-toggle-icon" aria-hidden="true">⌄</span>
        </button>
      </div>
      {areFiltersVisible && (
        <div id={`${vehicleType}-filters`}>
          <VehicleFilters
            characteristics={characteristics}
            values={filterValues}
            onChange={changeFilter}
            onSubmit={applyFilters}
            onReset={resetFilters}
          />
        </div>
      )}
      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? (
        <div className="vehicle-listings-loading" role="status" aria-label="Inserate werden geladen" aria-live="polite">
          <span className="vehicle-listings-loading-emoji" aria-hidden="true">
            {VEHICLE_TYPES[vehicleType]?.emoji}
          </span>
        </div>
      ) : result.items.length === 0 ? (
        <p className="intro">Keine passenden Inserate gefunden.</p>
      ) : (
        <>
          <p className="intro">{result.total} Inserat{result.total === 1 ? '' : 'e'} gefunden</p>
          <div className="vehicle-list-grid">
            {result.items.map((listing) => (
              <Link className="vehicle-listing-link" to={`/vehicles/${vehicleType}/listing/${listing.id}`} key={listing.id}>
              <article className="vehicle-listing">
                {listing.images?.[0]?.url ? (
                  <img src={listing.images[0].url} alt={listing.title} className="vehicle-listing-image" />
                ) : (
                  <div className="vehicle-listing-image vehicle-listing-image-placeholder">Kein Bild</div>
                )}
                <h3>{listing.title}</h3>
                <p>{listing.brand}{listing.model ? ` ${listing.model}` : ''}{listing.year ? ` (${listing.year})` : ''}</p>
                {listing.power != null && <p>{listing.power} PS</p>}
                <strong>€ {Number(listing.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
              </article>
              </Link>
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
