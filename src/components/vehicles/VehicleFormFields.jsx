import { SwissLocationFields } from '../SwissLocationFields';
import { VEHICLE_CONDITIONS } from '../../config/vehicleConditions';

export function VehicleFormFields({ configuration, values, onChange, onLocationChange, onFilesChange }) {
  return (
    <>
      <label>Titel<input name="title" value={values.title} onChange={onChange} required /></label>
      <label>Marke<input name="brand" value={values.brand} onChange={onChange} required /></label>
      {configuration.fields.model && (
        <label>Modell<input name="model" value={values.model} onChange={onChange} required={configuration.fields.modelRequired} /></label>
      )}
      {configuration.fields.year && (
        <label>Baujahr<input type="number" min="1886" max="2100" name="year" value={values.year} onChange={onChange} /></label>
      )}
      {configuration.fields.power && (
        <label>Leistung (PS)<input type="number" min="0" max="5000" name="power" value={values.power} onChange={onChange} /></label>
      )}
      {configuration.fields.power && (
        <>
          <label>Kilometerstand<input type="number" min="0" max="10000000" name="mileage" value={values.mileage} onChange={onChange} /></label>
          <label>Erstzulassung<input type="date" name="first_registration" value={values.first_registration} onChange={onChange} /></label>
        </>
      )}
      <label>
        Zustand
        <select name="condition" value={values.condition} onChange={onChange} required>
          {VEHICLE_CONDITIONS.map((condition) => (
            <option key={condition.value} value={condition.value}>{condition.label}</option>
          ))}
        </select>
      </label>
      <label>
        Bekannte Mängel {values.condition === 'damaged' ? '(erforderlich)' : '(optional)'}
        <textarea name="known_defects" rows="3" maxLength="5000" value={values.known_defects} onChange={onChange} required={values.condition === 'damaged'} />
      </label>
      <label>Preis (CHF)<input type="number" min="0" step="0.01" name="price" value={values.price} onChange={onChange} required /></label>
      <SwissLocationFields value={values} onChange={onLocationChange} />
      <label>Beschreibung<textarea name="description" rows="4" value={values.description} onChange={onChange} /></label>
      {onFilesChange && (
        <label>
          Bilder (optional, maximal 6)
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif,.jpg,.jpeg,.mpo,.avif,.heic,.heif" multiple onChange={onFilesChange} />
        </label>
      )}
    </>
  );
}
