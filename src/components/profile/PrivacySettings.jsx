import { useState } from 'react';

import { getAccountExport } from '../../api/profile';
import { createAppeal, getBlockedUsers, getModerationDecisions, unblockUser } from '../../api/safety';

export function PrivacySettings() {
  const [blocks, setBlocks] = useState(null);
  const [decisions, setDecisions] = useState(null);
  const [error, setError] = useState('');

  async function downloadExport() {
    setError('');
    try {
      const data = await getAccountExport();
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `konto-export-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function loadBlocks() {
    try { setBlocks(await getBlockedUsers()); } catch (requestError) { setError(requestError.message); }
  }

  async function loadDecisions() {
    try { setDecisions(await getModerationDecisions()); } catch (requestError) { setError(requestError.message); }
  }

  async function removeBlock(userId) {
    try {
      await unblockUser(userId);
      setBlocks((current) => current.filter((block) => block.blocked_user_id !== userId));
    } catch (requestError) { setError(requestError.message); }
  }

  async function appeal(reportId) {
    const statement = window.prompt('Begründe deinen Einspruch (mindestens 10 Zeichen):');
    if (!statement?.trim()) return;
    try {
      const created = await createAppeal(reportId, statement.trim());
      setDecisions((current) => current.map((decision) => (
        decision.id === reportId ? { ...decision, appeal: created } : decision
      )));
    } catch (requestError) { setError(requestError.message); }
  }

  return (
    <section className="settings-section">
      <h3>Datenschutz und Sicherheit</h3>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="settings-actions">
        <button className="general_button" type="button" onClick={downloadExport}>Meine Daten herunterladen</button>
        <button className="general_button" type="button" onClick={loadBlocks}>Blockierte Nutzer anzeigen</button>
        <button className="general_button" type="button" onClick={loadDecisions}>Moderationsentscheidungen</button>
      </div>
      {blocks && (
        <ul className="blocked-users-list">
          {blocks.length === 0 && <li>Keine blockierten Nutzer.</li>}
          {blocks.map((block) => (
            <li key={block.id}>
              <span>{block.username ? `@${block.username}` : 'Gelöschter Nutzer'}</span>
              <button className="general_button" type="button" onClick={() => removeBlock(block.blocked_user_id)}>Freigeben</button>
            </li>
          ))}
        </ul>
      )}
      {decisions?.map((decision) => (
        <article className="moderation-item" key={decision.id}>
          <p><strong>{decision.reason}</strong> · {decision.decision}</p>
          {decision.appeal ? (
            <small>Einspruch: {decision.appeal.status}{decision.appeal.decision ? ` · ${decision.appeal.decision}` : ''}</small>
          ) : (
            <button className="general_button" type="button" onClick={() => appeal(decision.id)}>Einspruch einreichen</button>
          )}
        </article>
      ))}
      {decisions?.length === 0 && <p>Keine Entscheidungen zu deinen Inhalten.</p>}
    </section>
  );
}

