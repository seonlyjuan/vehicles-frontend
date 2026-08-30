import { useState } from 'react';

import { deleteAccount } from '../../api/profile';

export function DeleteAccountSection({ auth }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  async function confirmDeletion() {
    const confirmation = window.prompt('Tippe KONTO LÖSCHEN, um dein Konto endgültig zu löschen.');
    if (confirmation !== 'KONTO LÖSCHEN') return;
    setIsDeleting(true);
    setError('');
    try {
      await deleteAccount();
      await auth.signOut();
    } catch (requestError) {
      setError(requestError.message);
      setIsDeleting(false);
    }
  }

  return (
    <section className="settings-section danger-zone">
      <h3>Konto löschen</h3>
      <p>Aktive Inserate und Bilder werden entfernt. Gesetzlich benötigte Zahlungsbelege bleiben getrennt erhalten.</p>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="general_button danger-button" type="button" disabled={isDeleting} onClick={confirmDeletion}>
        {isDeleting ? 'Konto wird gelöscht …' : 'Konto endgültig löschen'}
      </button>
    </section>
  );
}
