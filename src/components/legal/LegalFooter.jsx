import { Link } from 'react-router-dom';

import { legalOperator } from '../../config/legal';

export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <p>© {new Date().getFullYear()} {legalOperator.platformName}</p>
      <nav aria-label="Rechtliche Informationen">
        <Link to="/legal/impressum">Impressum</Link>
        <Link to="/legal/datenschutz">Datenschutzerklärung</Link>
        <Link to="/legal/agb">AGB</Link>
      </nav>
    </footer>
  );
}
