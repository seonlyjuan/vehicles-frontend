import { useState } from 'react';

import { reportContent } from '../../api/safety';

const REASONS = [
  ['fraud', 'Betrug oder Phishing'],
  ['stolen_vehicle', 'Fahrzeug möglicherweise gestohlen'],
  ['false_information', 'Falsche Angaben'],
  ['dealer_as_private', 'Händler als Privatverkäufer'],
  ['illegal_content', 'Verbotener oder rechtswidriger Inhalt'],
  ['copyright', 'Bild- oder Urheberrechtsverletzung'],
  ['harassment', 'Belästigung oder Drohung'],
  ['spam', 'Spam'],
  ['other', 'Sonstiges'],
];

export function ReportContent({ subject, label = 'Melden' }) {
  const [reason, setReason] = useState('fraud');
  const [description, setDescription] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState('');

  async function submit(event) {
    event.preventDefault();
    setIsSending(true);
    setResult('');
    try {
      await reportContent({ ...subject, reason, description: description.trim() || null });
      setResult('Danke. Die Meldung wurde übermittelt.');
      setDescription('');
    } catch (error) {
      setResult(error.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <details className="report-control">
      <summary>{label}</summary>
      <form onSubmit={submit}>
        <label>
          Grund
          <select value={reason} onChange={(event) => setReason(event.target.value)}>
            {REASONS.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
          </select>
        </label>
        <label>
          Beschreibung (optional)
          <textarea maxLength="2000" rows="3" value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <button className="general_button" type="submit" disabled={isSending}>
          {isSending ? 'Wird gemeldet …' : 'Meldung absenden'}
        </button>
        {result && <small role="status">{result}</small>}
      </form>
    </details>
  );
}
