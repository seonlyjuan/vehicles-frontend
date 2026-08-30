import { useState } from 'react';

import { SwissLocationFields } from '../SwissLocationFields';

function initialForm(user) {
  return {
    seller_type: user?.seller_type ?? 'private',
    company_name: user?.company_name ?? '',
    business_address: user?.business_address ?? '',
    business_postal_code: user?.business_postal_code ?? '',
    business_locality: user?.business_locality ?? '',
    business_canton: user?.business_canton ?? '',
    uid_number: user?.uid_number ?? '',
    commercial_register_number: user?.commercial_register_number ?? '',
    business_email: user?.business_email ?? '',
    business_phone: user?.business_phone ?? '',
  };
}

export function SellerSettingsForm({ auth }) {
  const [formData, setFormData] = useState(() => initialForm(auth.user));
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setMessage('');
    const payload = { ...formData };
    if (payload.seller_type === 'private') {
      Object.keys(payload).forEach((key) => { if (key !== 'seller_type') payload[key] = null; });
    } else {
      Object.keys(payload).forEach((key) => { if (payload[key] === '') payload[key] = null; });
    }
    try {
      await auth.updateSellerProfile(payload);
      setMessage(payload.seller_type === 'dealer'
        ? 'Händlerdaten gespeichert und zur Prüfung eingereicht.'
        : 'Verkäufertyp gespeichert.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  const changeField = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  return (
    <form className="listing-form settings-section" onSubmit={submit}>
      <h3>Verkäufertyp</h3>
      {error && <p className="error" role="alert">{error}</p>}
      {message && <p className="success" role="status">{message}</p>}
      <label>
        Konto verwenden als
        <select name="seller_type" value={formData.seller_type} onChange={changeField}>
          <option value="private">Privatverkäufer</option>
          <option value="dealer">Händler / gewerblicher Verkäufer</option>
        </select>
      </label>
      {formData.seller_type === 'dealer' && (
        <>
          <label>Firmenname<input name="company_name" value={formData.company_name} onChange={changeField} required /></label>
          <label>Geschäftsadresse<input name="business_address" value={formData.business_address} onChange={changeField} required /></label>
          <SwissLocationFields
            prefix="business_"
            value={{ postal_code: formData.business_postal_code, locality: formData.business_locality, canton: formData.business_canton }}
            onChange={(location) => setFormData((current) => ({
              ...current,
              business_postal_code: location.postal_code,
              business_locality: location.locality,
              business_canton: location.canton,
            }))}
          />
          <label>UID-Nummer<input name="uid_number" value={formData.uid_number} onChange={changeField} required /></label>
          <label>Handelsregisternummer (optional)<input name="commercial_register_number" value={formData.commercial_register_number} onChange={changeField} /></label>
          <label>Geschäftliche E-Mail<input type="email" name="business_email" value={formData.business_email} onChange={changeField} required /></label>
          <label>Geschäftliche Telefonnummer<input name="business_phone" value={formData.business_phone} onChange={changeField} required /></label>
        </>
      )}
      <button className="general_button primary-button" type="submit" disabled={isSaving}>
        {isSaving ? 'Wird gespeichert …' : 'Verkäuferdaten speichern'}
      </button>
    </form>
  );
}

