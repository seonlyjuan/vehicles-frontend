import { LegalPageLayout } from '../../components/legal/LegalPageLayout';
import { legalOperator } from '../../config/legal';

export function TermsPage() {
  return (
    <LegalPageLayout
      title="Allgemeine Geschäftsbedingungen"
      intro={`Nutzungsbedingungen für ${legalOperator.platformName}.`}
    >
      <section>
        <h2>1. Betreiber und Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung von {legalOperator.platformName},
          betrieben durch {legalOperator.legalName}, {legalOperator.streetAddress},
          {` ${legalOperator.postalAddress}`}. Sie gelten für registrierte Nutzer, private Verkäufer,
          Händler und Interessenten. Abweichende Bedingungen gelten nur, wenn der Betreiber ihnen
          ausdrücklich zugestimmt hat.
        </p>
      </section>

      <section>
        <h2>2. Schweizer Zielmarkt</h2>
        <p>
          Die Plattform richtet sich primär an Nutzerinnen und Nutzer in der Schweiz. Inserierte
          Fahrzeuge müssen sich in der Schweiz befinden und einen Schweizer Fahrzeugstandort mit
          Postleitzahl, Ort und Kanton aufweisen. Die technische Abrufbarkeit im Ausland stellt keine
          gezielte Ausrichtung auf einen ausländischen Markt dar.
        </p>
      </section>

      <section>
        <h2>3. Rolle der Plattform</h2>
        <p>
          Der Betreiber stellt ausschliesslich eine Inserats- und Kontaktplattform zur Verfügung.
          Er ist weder Verkäufer, Käufer, Vertreter noch Vermittler des Fahrzeugkaufvertrags und
          wird nicht Eigentümer eines inserierten Fahrzeugs. Das Inserat stammt vom angegebenen
          Verkäufer.
        </p>
        <p>
          Ein allfälliger Fahrzeugkaufvertrag entsteht ausschliesslich direkt zwischen Käufer und
          Verkäufer. Besichtigung, Fahrzeugprüfung, Preisverhandlung, Zahlung, Eigentumsübertragung,
          Zulassung und Übergabe erfolgen ausserhalb der Plattform und in Verantwortung der Parteien.
          Die Plattform verwahrt keinen Fahrzeugkaufpreis und bietet keinen Treuhandservice an.
        </p>
      </section>

      <section>
        <h2>4. Registrierung und Mindestalter</h2>
        <p>
          Ein Benutzerkonto darf nur von volljährigen und handlungsfähigen Personen eröffnet werden.
          Nutzer müssen richtige, vollständige und aktuelle Angaben machen, ihre Zugangsmittel
          schützen und einen Missbrauch ihres Kontos unverzüglich melden. Konten dürfen nicht ohne
          Zustimmung des Betreibers übertragen oder für Dritte geführt werden.
        </p>
      </section>

      <section>
        <h2>5. Private Verkäufer und Händler</h2>
        <p>
          Verkäufer müssen wahrheitsgemäss angeben, ob sie privat oder gewerblich handeln. Händler
          müssen ihre vollständige Geschäftsidentität und die verlangten Register- und Kontaktdaten
          hinterlegen. Der Betreiber kann Nachweise verlangen, den Händlerstatus prüfen und bei
          unrichtiger Einstufung korrigieren oder sperren. Eine Händlerprüfung ist keine Prüfung des
          Fahrzeugs, der Bonität oder sämtlicher rechtlicher Pflichten des Händlers.
        </p>
      </section>

      <section>
        <h2>6. Anforderungen an Inserate</h2>
        <p>Verkäufer sind insbesondere verpflichtet:</p>
        <ul>
          <li>nur Fahrzeuge anzubieten, über die sie verfügen dürfen;</li>
          <li>Fahrzeug, Preis, Zustand, Laufleistung und bekannte wesentliche Mängel korrekt anzugeben;</li>
          <li>das Inserat aktuell zu halten und nicht mehr verfügbare Fahrzeuge zu archivieren;</li>
          <li>nur Texte, Bilder und sonstige Inhalte zu verwenden, an denen sie die nötigen Rechte besitzen;</li>
          <li>gesetzliche Informations-, Preis-, Gewährleistungs- und Fahrzeugvorschriften einzuhalten.</li>
        </ul>
        <p>
          Der Betreiber prüft Fahrzeuge und Inseratsangaben nicht vollständig und garantiert weder
          Identität, Eigentum, Zustand, Zulässigkeit, Verfügbarkeit noch Zahlungsfähigkeit einer Partei.
        </p>
      </section>

      <section>
        <h2>7. Verbotene Inhalte und Nutzungen</h2>
        <p>Untersagt sind insbesondere:</p>
        <ul>
          <li>gestohlene Fahrzeuge sowie betrügerische, falsche oder irreführende Angebote;</li>
          <li>gefälschte Dokumente, manipulierte Identitäten und fremde Bilder ohne Erlaubnis;</li>
          <li>rechtswidrige, diskriminierende, bedrohende oder persönlichkeitsverletzende Inhalte;</li>
          <li>Schadsoftware, Phishing, Spam und betrügerische externe Zahlungslinks;</li>
          <li>Umgehung von Sicherheits-, Zahlungs-, Sperr- oder Moderationsmassnahmen;</li>
          <li>automatisiertes Auslesen oder übermässige Belastung der Plattform ohne Erlaubnis.</li>
        </ul>
      </section>

      <section>
        <h2>8. Inseratsleistung, Preis und Laufzeit</h2>
        <p>
          Die Inseratsgebühr beträgt [GESAMTPREIS IN CHF, INKLUSIVE ALLFÄLLIGER MWST]. Die Laufzeit
          eines veröffentlichten Inserats beträgt [LAUFZEIT] Tage. Leistungsumfang, Gesamtpreis,
          Laufzeit und eine allfällige Verlängerung werden vor der kostenpflichtigen Bestellung
          nochmals angezeigt. Nutzer können ihre Angaben vor dem Absenden korrigieren.
        </p>
      </section>

      <section>
        <h2>9. Zahlung und Veröffentlichung</h2>
        <p>
          Ein kostenpflichtiges Inserat wird erst nach serverseitiger Bestätigung einer erfolgreichen
          Zahlung veröffentlicht. Als Zahlungsanbieter ist Payrexx/TWINT vorgesehen. Ein Redirect im
          Browser allein gilt nicht als Zahlungsnachweis. Nach der Bestellung erhält der Nutzer eine
          elektronische Bestätigung. Bis zur produktiven Aktivierung eines Zahlungsanbieters werden
          keine kostenpflichtigen Plattformleistungen angeboten.
        </p>
      </section>

      <section>
        <h2>10. Zahlungsfehler und Rückerstattungen</h2>
        <p>
          Bei einer fehlgeschlagenen oder abgebrochenen Zahlung besteht kein Anspruch auf
          Veröffentlichung. Für doppelte Belastungen, technische Fehlbuchungen und berechtigte
          Rückerstattungen gilt folgende noch festzulegende Regelung: [RÜCKERSTATTUNGSREGEL EINFÜGEN].
          Zwingende gesetzliche Ansprüche bleiben vorbehalten.
        </p>
      </section>

      <section>
        <h2>11. Interne Nachrichten</h2>
        <p>
          Das Nachrichtensystem darf ausschliesslich für seriöse Anfragen im Zusammenhang mit
          Inseraten verwendet werden. Belästigung, Spam, Phishing, rechtswidrige Inhalte und
          betrügerische Zahlungsaufforderungen sind verboten. Nutzer sollen keine unnötigen
          sensiblen Daten, Passwörter oder vollständigen Zahlungsdaten versenden. Nachrichten sind
          nicht Ende-zu-Ende-verschlüsselt.
        </p>
      </section>

      <section>
        <h2>12. Nutzungsrechte an Inhalten</h2>
        <p>
          Nutzer behalten ihre Rechte an hochgeladenen Texten und Bildern. Sie erteilen dem Betreiber
          für die Dauer und den Zweck des Inserats ein nicht ausschliessliches, räumlich erforderliches
          und unentgeltliches Recht, diese Inhalte zu speichern, technisch zu bearbeiten, zu verkleinern,
          darzustellen und innerhalb der Plattform bereitzustellen. Der Betreiber darf Inhalte zur
          Sicherung, Moderation und Rechtsdurchsetzung im notwendigen Umfang aufbewahren.
        </p>
      </section>

      <section>
        <h2>13. Moderation und Massnahmen</h2>
        <p>
          Der Betreiber kann Inhalte prüfen, ablehnen, einschränken, archivieren oder löschen und
          Konten vorübergehend oder dauerhaft sperren, wenn konkrete Hinweise auf Verstösse,
          Sicherheitsrisiken oder rechtswidrige Inhalte bestehen. Soweit angemessen, werden Gründe
          mitgeteilt und eine Einspruchsmöglichkeit angeboten. Gesetzliche Melde- und
          Mitwirkungspflichten bleiben vorbehalten.
        </p>
      </section>

      <section>
        <h2>14. Pflichten beim Fahrzeuggeschäft</h2>
        <p>
          Käufer und Verkäufer sind selbst für Prüfung, Vertrag, Preiszahlung, Eigentum, Mängel,
          Gewährleistung, Versicherungen, Zulassung, Steuern und Übergabe verantwortlich. Vor einer
          Zahlung sollen Identität, Fahrzeugpapiere, Verfügungsberechtigung und Fahrzeugzustand
          angemessen geprüft werden. Zahlungen aufgrund unbekannter Links oder ohne Prüfung des
          Fahrzeugs erfolgen auf eigenes Risiko.
        </p>
      </section>

      <section>
        <h2>15. Verfügbarkeit und Änderungen der Plattform</h2>
        <p>
          Der Betreiber bemüht sich um einen zuverlässigen Betrieb, schuldet aber keine
          unterbrechungsfreie Verfügbarkeit. Wartung, Sicherheitsmassnahmen und Ereignisse ausserhalb
          des Einflussbereichs können die Nutzung vorübergehend einschränken. Funktionen können aus
          sachlichen Gründen weiterentwickelt oder eingestellt werden; bereits bezahlte Leistungen
          werden dabei angemessen berücksichtigt.
        </p>
      </section>

      <section>
        <h2>16. Haftung</h2>
        <p>
          Verkäufer und Käufer haften für ihre Angaben, Inhalte, Kommunikation und die Durchführung
          des Fahrzeuggeschäfts. Der Betreiber haftet im gesetzlich zwingenden Umfang für eigene
          Pflichtverletzungen. Soweit gesetzlich zulässig, ist die Haftung für leichte Fahrlässigkeit,
          mittelbare Schäden, entgangenen Gewinn sowie Handlungen anderer Nutzer ausgeschlossen.
          Haftungsausschlüsse gelten nicht bei rechtswidriger Absicht, grober Fahrlässigkeit oder
          dort, wo das Gesetz eine Beschränkung verbietet.
        </p>
      </section>

      <section>
        <h2>17. Konto, Kündigung und Löschung</h2>
        <p>
          Nutzer können ihr Konto über die vorgesehenen Einstellungen löschen. Aktive Inserate werden
          dabei beendet. Daten werden nach Massgabe der Datenschutzerklärung gelöscht, anonymisiert
          oder aufgrund gesetzlicher Pflichten und laufender Verfahren befristet aufbewahrt. Offene
          Zahlungs-, Streit- oder Moderationsfälle bleiben von der Kontolöschung unberührt, soweit
          ihre weitere Bearbeitung erforderlich ist.
        </p>
      </section>

      <section>
        <h2>18. Änderungen dieser AGB</h2>
        <p>
          Der Betreiber kann diese AGB aus sachlichen Gründen ändern. Die aktuelle Fassung wird mit
          Versionsnummer und Datum veröffentlicht. Über wesentliche Änderungen werden registrierte
          Nutzer angemessen informiert. Wenn eine erneute Zustimmung erforderlich ist, werden die
          betroffenen Funktionen erst nach dieser Zustimmung weiter nutzbar.
        </p>
      </section>

      <section>
        <h2>19. Schlussbestimmungen</h2>
        <p>
          Es gilt Schweizer Recht. Ausschliesslicher Gerichtsstand ist [GERICHTSSTAND], soweit keine
          zwingenden Konsumentenschutz- oder Gerichtsstandsbestimmungen einen anderen Gerichtsstand
          vorsehen. Sollten einzelne Bestimmungen unwirksam sein, bleiben die übrigen Bestimmungen
          im gesetzlich zulässigen Umfang bestehen.
        </p>
      </section>

      <section>
        <h2>20. Kontakt</h2>
        <p>Fragen zu diesen AGB können an {legalOperator.email} gerichtet werden.</p>
      </section>
    </LegalPageLayout>
  );
}
