function RangeInputs({ characteristic, values, onChange }) {
  const inputProps = {
    type: 'number',
    min: characteristic.min,
    max: characteristic.max,
  };

  return (
    <fieldset className="vehicle-filter-range">
      <legend>{characteristic.label}{characteristic.unit ? ` (${characteristic.unit})` : ''}</legend>
      <label>
        Von
        <input {...inputProps} name={`${characteristic.name}_min`} value={values[`${characteristic.name}_min`] ?? ''} onChange={onChange} />
      </label>
      <label>
        Bis
        <input {...inputProps} name={`${characteristic.name}_max`} value={values[`${characteristic.name}_max`] ?? ''} onChange={onChange} />
      </label>
    </fieldset>
  );
}

export function VehicleFilters({ characteristics, values, onChange, onSubmit, onReset }) {
  return (
    <form className="vehicle-filters" onSubmit={onSubmit}>
      <div className="vehicle-filter-fields">
        {characteristics.map((characteristic) => (
          characteristic.type === 'range' ? (
            <RangeInputs key={characteristic.name} characteristic={characteristic} values={values} onChange={onChange} />
          ) : (
            <label key={characteristic.name}>
              {characteristic.label}
              <input
                name={characteristic.name}
                type="text"
                value={values[characteristic.name] ?? ''}
                onChange={onChange}
              />
            </label>
          )
        ))}
      </div>
      <div className="vehicle-filter-actions">
        <button className="general_button" type="submit">Filter anwenden</button>
        <button className="general_button" type="button" onClick={onReset}>Zurücksetzen</button>
      </div>
    </form>
  );
}
