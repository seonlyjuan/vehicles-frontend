import { useEffect, useRef, useState } from 'react';

import { searchPostalCodes } from '../api/locations';

export function SwissLocationFields({ value, onChange, prefix = '' }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let active = true;
    if (!/^\d{4}$/.test(value.postal_code ?? '')) {
      return undefined;
    }
    searchPostalCodes(value.postal_code)
      .then((items) => {
        if (!active) return;
        setOptions(items);
        setError(items.length ? '' : 'Keine passende Schweizer PLZ gefunden.');
        if (items.length === 1) onChangeRef.current(items[0]);
      })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, [value.postal_code]);

  const selectedValue = value.locality
    ? `${value.postal_code}|${value.locality}|${value.canton}`
    : '';
  const visibleOptions = /^\d{4}$/.test(value.postal_code ?? '') ? options : [];

  return (
    <fieldset className="location-fields">
      <legend>Fahrzeugstandort Schweiz</legend>
      <label>
        Postleitzahl
        <input
          name={`${prefix}postal_code`}
          inputMode="numeric"
          pattern="[1-9][0-9]{3}"
          maxLength="4"
          value={value.postal_code ?? ''}
          onChange={(event) => onChange({ postal_code: event.target.value, locality: '', canton: '' })}
          required
        />
      </label>
      <label>
        Ort und Kanton
        <select
          name={`${prefix}location`}
          value={selectedValue}
          onChange={(event) => {
            const [postal_code, locality, canton] = event.target.value.split('|');
            onChange({ postal_code, locality, canton });
          }}
          disabled={!visibleOptions.length}
          required
        >
          <option value="">Ort auswählen</option>
          {visibleOptions.map((option) => (
            <option
              value={`${option.postal_code}|${option.locality}|${option.canton}`}
              key={`${option.postal_code}-${option.locality}-${option.canton}`}
            >
              {option.postal_code} {option.locality}, {option.canton}
            </option>
          ))}
        </select>
      </label>
      {error && visibleOptions.length === 0 && /^\d{4}$/.test(value.postal_code ?? '') && <small className="field-error">{error}</small>}
      <small>Öffentlich sichtbar ist nur PLZ, Ort und Kanton – keine Strasse.</small>
    </fieldset>
  );
}
