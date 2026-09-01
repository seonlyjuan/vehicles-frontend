import { Link } from 'react-router-dom';

import { legalDocumentStatus } from '../../config/legal';
import { LegalFooter } from './LegalFooter';

export function LegalPageLayout({ title, intro, children }) {
  return (
    <div className="legal-public-layout">
      <main className="page legal-page">
        <article className="card legal-document">
          <header className="legal-document-header">
            <span className="legal-draft-badge">Entwurf mit Platzhaltern</span>
            <h1>{title}</h1>
            <p>{intro}</p>
            <dl className="legal-document-meta">
              <div><dt>Version</dt><dd>{legalDocumentStatus.version}</dd></div>
              <div><dt>Stand</dt><dd>{legalDocumentStatus.updatedAt}</dd></div>
            </dl>
          </header>

          <aside className="legal-draft-notice" role="note">
            Dieser Entwurf enthält Platzhalter und ist noch nicht für den öffentlichen
            Betrieb freigegeben. Vor dem Launch müssen alle Angaben ergänzt und die
            endgültige Fassung rechtlich geprüft werden.
          </aside>

          <div className="legal-document-content">{children}</div>

          <Link className="general_button legal-back-link" to="/">
            Zurück zur Startseite
          </Link>
        </article>
      </main>
      <LegalFooter />
    </div>
  );
}
