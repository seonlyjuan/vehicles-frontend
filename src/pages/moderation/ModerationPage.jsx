import { useEffect, useState } from 'react';

import { decideAppeal, decideDealer, decideReport, getAppeals, getPendingDealers, getReports } from '../../api/moderation';
import { decideRefundRequest, getRefundRequests } from '../../api/payments';

export function ModerationPage() {
  const [reports, setReports] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [appeals, setAppeals] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [error, setError] = useState('');

  function loadData() {
    Promise.all([getReports('open'), getPendingDealers(), getAppeals(), getRefundRequests('requested')])
      .then(([reportResult, dealerResult, appealResult, refundResult]) => {
        setReports(reportResult.items);
        setDealers(dealerResult);
        setAppeals(appealResult);
        setRefunds(refundResult);
        setError('');
      })
      .catch((requestError) => setError(requestError.message));
  }

  useEffect(loadData, []);

  async function reviewReport(report, action, outcome = 'resolved') {
    const decision = window.prompt('Begründung der Moderationsentscheidung:');
    if (!decision?.trim()) return;
    try {
      await decideReport(report.id, { outcome, action, decision: decision.trim() });
      setReports((current) => current.filter((item) => item.id !== report.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function reviewDealer(dealer, status) {
    const decision = window.prompt('Begründung der Händlerprüfung:');
    if (!decision?.trim()) return;
    try {
      await decideDealer(dealer.id, { status, decision: decision.trim() });
      setDealers((current) => current.filter((item) => item.id !== dealer.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function reviewAppeal(appeal, status) {
    const decision = window.prompt('Begründung zur Einspruchsentscheidung:');
    if (!decision?.trim()) return;
    try {
      await decideAppeal(appeal.id, { status, decision: decision.trim() });
      setAppeals((current) => current.filter((item) => item.id !== appeal.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function reviewRefund(refund, decision) {
    const note = window.prompt(`Begründung für ${decision === 'approve' ? 'die Genehmigung' : 'die Ablehnung'}:`);
    if (!note?.trim()) return;
    try {
      await decideRefundRequest(refund.id, decision, note.trim());
      setRefunds((current) => current.filter((item) => item.id !== refund.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="card moderation-card">
      <h2>Moderation</h2>
      {error && <p className="error" role="alert">{error}</p>}

      <section className="moderation-section">
        <h3>Offene Meldungen ({reports.length})</h3>
        {reports.length === 0 ? <p>Keine offenen Meldungen.</p> : reports.map((report) => (
          <article className="moderation-item" key={report.id}>
            <p><strong>{report.reason}</strong> · {report.subject_type} · Priorität {report.priority}</p>
            <p>{report.description || 'Keine zusätzliche Beschreibung.'}</p>
            <small>Gemeldet von {report.reporter_username ? `@${report.reporter_username}` : 'gelöschtem Nutzer'}</small>
            <div className="moderation-actions">
              <button className="general_button" onClick={() => reviewReport(report, 'none', 'rejected')}>Ablehnen</button>
              <button className="general_button" onClick={() => reviewReport(report, 'none')}>Erledigen</button>
              {report.subject_type === 'listing' && <button className="general_button danger-button" onClick={() => reviewReport(report, 'suspend_listing')}>Inserat sperren</button>}
              {report.reported_user_id && <button className="general_button danger-button" onClick={() => reviewReport(report, 'suspend_user')}>Nutzer sperren</button>}
            </div>
          </article>
        ))}
      </section>

      <section className="moderation-section">
        <h3>Offene Einsprüche ({appeals.length})</h3>
        {appeals.length === 0 ? <p>Keine offenen Einsprüche.</p> : appeals.map((appeal) => (
          <article className="moderation-item" key={appeal.id}>
            <p>{appeal.statement}</p>
            <div className="moderation-actions">
              <button className="general_button primary-button" onClick={() => reviewAppeal(appeal, 'accepted')}>Annehmen</button>
              <button className="general_button" onClick={() => reviewAppeal(appeal, 'rejected')}>Ablehnen</button>
            </div>
          </article>
        ))}
      </section>

      <section className="moderation-section">
        <h3>Händlerprüfungen ({dealers.length})</h3>
        {dealers.length === 0 ? <p>Keine ausstehenden Händlerprüfungen.</p> : dealers.map((dealer) => (
          <article className="moderation-item" key={dealer.id}>
            <p><strong>{dealer.company_name}</strong> · {dealer.uid_number}</p>
            <p>{dealer.business_address}, {dealer.business_postal_code} {dealer.business_locality}, {dealer.business_canton}</p>
            <p>{dealer.business_email} · {dealer.business_phone}</p>
            <div className="moderation-actions">
              <button className="general_button primary-button" onClick={() => reviewDealer(dealer, 'verified')}>Verifizieren</button>
              <button className="general_button" onClick={() => reviewDealer(dealer, 'rejected')}>Ablehnen</button>
              <button className="general_button danger-button" onClick={() => reviewDealer(dealer, 'suspended')}>Sperren</button>
            </div>
          </article>
        ))}
      </section>

      <section className="moderation-section">
        <h3>Rückerstattungsanträge ({refunds.length})</h3>
        {refunds.length === 0 ? <p>Keine offenen Rückerstattungsanträge.</p> : refunds.map((refund) => (
          <article className="moderation-item" key={refund.id}>
            <p><strong>Zahlung {refund.payment_id}</strong></p>
            {refund.listing_payments && (
              <p>{refund.listing_payments.vehicle_type} · Inserat {refund.listing_payments.listing_id} · {Number(refund.listing_payments.amount).toLocaleString('de-CH', { style: 'currency', currency: refund.listing_payments.currency })}</p>
            )}
            <p>{refund.reason}</p>
            <small>Eingereicht am {new Date(refund.created_at).toLocaleString('de-CH')}</small>
            <div className="moderation-actions">
              <button className="general_button primary-button" onClick={() => reviewRefund(refund, 'approve')}>Genehmigen</button>
              <button className="general_button danger-button" onClick={() => reviewRefund(refund, 'reject')}>Ablehnen</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
