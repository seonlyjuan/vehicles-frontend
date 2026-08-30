import { Link } from 'react-router-dom';

import { changeVehicleListingStatus, deleteVehicleListing } from '../../api/vehicles';

export function ListingManagementActions({ listing, onChange, onDelete, onError }) {
  const basePath = `/vehicles/${listing.vehicle_type}/listing/${listing.id}`;

  async function changeStatus(action) {
    try {
      onChange(await changeVehicleListingStatus(listing.vehicle_type, listing.id, action));
    } catch (error) {
      onError(error.message);
    }
  }

  async function remove() {
    if (!window.confirm('Inserat wirklich löschen? Die Bilder werden sofort entfernt.')) return;
    try {
      await deleteVehicleListing(listing.vehicle_type, listing.id);
      onDelete();
    } catch (error) {
      onError(error.message);
    }
  }

  return (
    <div className="listing-card-actions">
      {listing.status === 'draft' ? (
        <Link to={`${basePath}/payment`}><button className="general_button">Zahlung fortsetzen</button></Link>
      ) : (
        <Link to={`${basePath}/edit`}><button className="general_button">Bearbeiten</button></Link>
      )}
      {listing.status === 'active' && <button className="general_button" onClick={() => changeStatus('archive')}>Archivieren</button>}
      {listing.status === 'active' && <button className="general_button" onClick={() => changeStatus('mark_sold')}>Verkauft</button>}
      {listing.status === 'archived' && <button className="general_button" onClick={() => changeStatus('reactivate')}>Reaktivieren</button>}
      <button className="general_button danger-button" onClick={remove}>Löschen</button>
    </div>
  );
}

