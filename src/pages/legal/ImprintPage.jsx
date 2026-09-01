import { LegalPageLayout } from '../../components/legal/LegalPageLayout';
import { legalOperator } from '../../config/legal';

export function ImprintPage() {
  return (
    <LegalPageLayout
      title="Impressum"
      intro="Anbieterkennzeichnung und Kontaktinformationen der Plattform."
    >
      <section>
        <h2>Betreiber der Plattform</h2>
        <address>
          <strong>{legalOperator.legalName}</strong><br />
          {legalOperator.legalForm}<br />
          {legalOperator.streetAddress}<br />
          {legalOperator.postalAddress}<br />
          {legalOperator.country}
        </address>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: {legalOperator.email}<br />
          Telefon: {legalOperator.phone}<br />
          Website: {legalOperator.domain}
        </p>
      </section>

      <section>
        <h2>Vertretung und Registerangaben</h2>
        <p>
          Vertretungsberechtigte Person: {legalOperator.representative}<br />
          Handelsregister: {legalOperator.commercialRegister}<br />
          Unternehmens-Identifikationsnummer: {legalOperator.uid}<br />
          Mehrwertsteuernummer: {legalOperator.vatNumber}
        </p>
      </section>

      <section>
        <h2>Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für Plattform- und Datenschutzanfragen ist der oben genannte
          Betreiber. Datenschutzanfragen können an {legalOperator.privacyEmail} gerichtet werden.
        </p>
      </section>

      <section>
        <h2>Rolle der Plattform</h2>
        <p>
          Die Plattform stellt Inserats- und Kontaktfunktionen für Fahrzeuge mit Standort
          in der Schweiz bereit. Sie ist nicht Verkäuferin der inserierten Fahrzeuge. Ein
          allfälliger Fahrzeugkaufvertrag entsteht ausschliesslich zwischen Käufer und Verkäufer.
        </p>
      </section>
    </LegalPageLayout>
  );
}
