import { LegalPageLayout } from '../../components/legal/LegalPageLayout';
import { legalOperator } from '../../config/legal';

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Datenschutzerklärung"
      intro="Information über die Bearbeitung von Personendaten auf der Fahrzeugplattform."
    >
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Bearbeitung von Personendaten ist {legalOperator.legalName},
          {` ${legalOperator.streetAddress}, ${legalOperator.postalAddress}, ${legalOperator.country}`}.
          Datenschutzanfragen können an {legalOperator.privacyEmail} gerichtet werden.
        </p>
      </section>

      <section>
        <h2>2. Geltungsbereich</h2>
        <p>
          Diese Datenschutzerklärung gilt für die Nutzung von {legalOperator.platformName},
          einschliesslich Website, Benutzerkonto, Fahrzeuginseraten, internem Nachrichtensystem,
          Benachrichtigungen, Support sowie Melde- und Moderationsfunktionen. Die Plattform richtet
          sich primär an Nutzerinnen und Nutzer in der Schweiz und an Fahrzeuge mit Standort in
          der Schweiz.
        </p>
      </section>

      <section>
        <h2>3. Welche Daten wir bearbeiten</h2>
        <h3>Google-Login und Benutzerkonto</h3>
        <p>
          Beim Login über Google bearbeiten wir insbesondere die von Google und Supabase
          übermittelten Identifikationsdaten, die E-Mail-Adresse, den Namen, ein allfälliges
          Profilbild sowie Sitzungs- und Authentifizierungsdaten. Zusätzlich können ein
          Benutzername, der Verkäufertyp und Profildaten gespeichert werden.
        </p>

        <h3>Verkäufer- und Händlerdaten</h3>
        <p>
          Bei privaten Verkäufern und Händlern bearbeiten wir die für die Nutzung und Prüfung
          notwendigen Angaben. Bei Händlern können dies insbesondere Firmenname, Geschäftsadresse,
          Geschäftskontaktdaten, UID- und Handelsregisterangaben sowie der Prüfstatus sein. Nicht
          ausdrücklich als öffentlich bezeichnete Kontakt- und Adressdaten werden nicht im Inserat
          veröffentlicht.
        </p>

        <h3>Inserate und Standort</h3>
        <p>
          Wir bearbeiten Inseratstexte, Fahrzeugdaten, Preise, Bilder, Zustand, bekannte Mängel,
          Kilometerstand, Erstzulassung sowie Schweizer Postleitzahl, Ort und Kanton. Die genaue
          Wohnadresse eines privaten Verkäufers wird nicht als Fahrzeugstandort veröffentlicht.
        </p>

        <h3>Nachrichten und Benachrichtigungen</h3>
        <p>
          Das interne Nachrichtensystem speichert Gesprächsteilnehmer, Nachrichteninhalt,
          Zeitpunkte und Lesestatus. Benachrichtigungen speichern unter anderem Empfänger,
          Ereignistyp, Bezug zum betroffenen Inhalt und Lesestatus.
        </p>

        <h3>Meldungen, Moderation und Sicherheit</h3>
        <p>
          Bei Meldungen oder Beschwerden bearbeiten wir den gemeldeten Inhalt, den Grund, eine
          optionale Beschreibung, beteiligte Konten, Entscheidungen, Einsprüche und Zeitpunkte.
          Zusätzlich können technische Protokolle, IP-Adresse, Browser- und Geräteinformationen
          sowie Daten zur Missbrauchs- und Rate-Limit-Erkennung anfallen.
        </p>

        <h3>Zahlungen</h3>
        <p>
          Sobald kostenpflichtige Inserate produktiv angeboten werden, bearbeiten wir Betrag,
          Währung, Zahlungsstatus, Zeitpunkt und die Transaktionsreferenz des Zahlungsanbieters.
          Vollständige Karten- oder Bankdaten sollen nicht auf unserer Plattform gespeichert werden.
          Als Zahlungsanbieter ist Payrexx/TWINT vorgesehen; die Angaben werden vor Aktivierung
          dieses Dienstes ergänzt.
        </p>

        <h3>AGB-Zustimmungen</h3>
        <p>
          Vor der Veröffentlichung eines Inserats protokollieren wir die Nutzer-ID, das betroffene
          Inserat, den Fahrzeugtyp, die akzeptierte Dokumentversion und den serverseitigen Zeitpunkt
          der Zustimmung. Dadurch können wir nachweisen, welche Bedingungen für die Veröffentlichung
          bestätigt wurden.
        </p>
      </section>

      <section>
        <h2>4. Zwecke der Bearbeitung</h2>
        <ul>
          <li>Registrierung, Anmeldung und Verwaltung des Benutzerkontos;</li>
          <li>Erstellung, Darstellung, Suche und Verwaltung von Fahrzeuginseraten;</li>
          <li>Kommunikation zwischen Interessenten und Verkäufern;</li>
          <li>Abwicklung und Nachweis kostenpflichtiger Plattformleistungen;</li>
          <li>Support, Benachrichtigungen und Beantwortung von Anfragen;</li>
          <li>Verhinderung von Betrug, Spam, Missbrauch und Sicherheitsvorfällen;</li>
          <li>Bearbeitung von Meldungen, Beschwerden und Moderationsentscheidungen;</li>
          <li>Erfüllung gesetzlicher Pflichten und Durchsetzung rechtlicher Ansprüche;</li>
          <li>technischer Betrieb, Fehleranalyse und Verbesserung der Plattform.</li>
        </ul>
        <p>
          Soweit die DSGVO ausnahmsweise anwendbar ist, erfolgt die Bearbeitung je nach Fall zur
          Vertragserfüllung, aufgrund gesetzlicher Pflichten, berechtigter Interessen oder einer
          ausdrücklich eingeholten Einwilligung.
        </p>
      </section>

      <section>
        <h2>5. Browser-Speicherung und Cookies</h2>
        <p>
          Supabase speichert die für die Anmeldung erforderliche Sitzung im lokalen Speicher des
          Browsers. Diese Speicherung ist für die angemeldete Nutzung notwendig. Der Google-Login
          wird bewusst durch den Nutzer gestartet und verwendet den PKCE-Verfahrensablauf. Derzeit
          setzen wir keine eigenen Analyse-, Werbe- oder Profilingdienste ein. Falls später nicht
          notwendige Trackingtechnologien eingeführt werden, informieren wir vorgängig und holen,
          soweit erforderlich, eine Einwilligung ein.
        </p>
      </section>

      <section>
        <h2>6. Empfänger und Dienstleister</h2>
        <p>Personendaten können im erforderlichen Umfang an folgende Kategorien weitergegeben werden:</p>
        <ul>
          <li>Supabase für Authentifizierung, Datenbank, Realtime und Dateispeicherung;</li>
          <li>Google als Anbieter des freiwillig verwendeten Google-Logins;</li>
          <li>[HOSTINGANBIETER] für den Betrieb von Frontend und Backend;</li>
          <li>Payrexx und beteiligte Zahlungsdienstleister nach Aktivierung der Bezahlfunktion;</li>
          <li>[E-MAIL-, SUPPORT- UND MONITORINGANBIETER, FALLS EINGESETZT];</li>
          <li>Behörden oder Rechtsberater, soweit eine gesetzliche Pflicht oder ein berechtigter Anlass besteht.</li>
        </ul>
        <p>
          Dienstleister dürfen Daten nur im vereinbarten Umfang bearbeiten und werden vertraglich
          zum angemessenen Schutz verpflichtet.
        </p>
      </section>

      <section>
        <h2>7. Bearbeitungsorte und Auslandübermittlung</h2>
        <p>
          Daten können in der Schweiz sowie in den Ländern bearbeitet werden, in denen unsere
          Dienstleister tätig sind. Vor dem Launch sind hier die tatsächlichen Regionen und Länder
          einzutragen: [SUPABASE-REGION UND LÄNDER], [HOSTING-REGION UND LÄNDER], [GOOGLE-LÄNDER]
          und später [PAYREXX-LÄNDER]. Bei einer Übermittlung in ein Land ohne angemessenes
          Datenschutzniveau werden die gesetzlich erforderlichen Garantien eingesetzt.
        </p>
      </section>

      <section>
        <h2>8. Aufbewahrung und Löschung</h2>
        <p>Wir bewahren Daten nur so lange auf, wie dies für den jeweiligen Zweck erforderlich ist:</p>
        <ul>
          <li>aktive Kontodaten grundsätzlich für die Dauer des Benutzerkontos;</li>
          <li>zur Löschung markierte Inserate und Bilder derzeit bis zu 30 Tage;</li>
          <li>geschlossene Unterhaltungen derzeit bis zu 365 Tage;</li>
          <li>gelesene Nachrichten- und Plattformbenachrichtigungen derzeit bis zu 90 Tage;</li>
          <li>abgeschlossene Meldungen und Moderationsprotokolle derzeit bis zu drei Jahre;</li>
          <li>Zahlungs-, Buchungs- und zugehörige AGB-Nachweise grundsätzlich rund zehn Jahre;</li>
          <li>technische und Sicherheitsprotokolle: [KONKRETE FRIST DES HOSTINGS EINFÜGEN];</li>
          <li>Backups: [BACKUP-ZYKLUS UND ENDGÜLTIGE LÖSCHFRIST EINFÜGEN].</li>
        </ul>
        <p>
          Daten können länger aufbewahrt werden, wenn gesetzliche Pflichten, laufende Streitigkeiten,
          Betrugsverdacht oder Sicherheitsvorfälle dies erfordern. Nach einer Kontolöschung werden
          nicht mehr benötigte operative Daten gelöscht oder anonymisiert; gesetzlich erforderliche
          Nachweise bleiben getrennt erhalten.
        </p>
      </section>

      <section>
        <h2>9. Datensicherheit</h2>
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen gegen unberechtigten
          Zugriff, Verlust, Veränderung und Missbrauch. Dazu gehören insbesondere verschlüsselte
          Übertragung, Zugriffsbeschränkungen, Datenbank- und Storage-Regeln, Eingabe- und
          Uploadprüfungen, Rate Limits sowie Sicherheitsprotokollierung. Ein absoluter Schutz kann
          bei keiner Datenübertragung garantiert werden.
        </p>
      </section>

      <section>
        <h2>10. Rechte betroffener Personen</h2>
        <p>
          Betroffene Personen können im Rahmen des anwendbaren Rechts insbesondere Auskunft,
          Berichtigung, Löschung, Herausgabe oder Übertragung ihrer Daten sowie die Einschränkung
          oder den Widerspruch gegen bestimmte Bearbeitungen verlangen. Im Benutzerkonto stehen
          Funktionen für Datenexport, Profilkorrektur und Kontolöschung zur Verfügung. Weitere
          Anfragen können an {legalOperator.privacyEmail} gerichtet werden. Beschwerden können beim
          Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten eingereicht werden.
        </p>
      </section>

      <section>
        <h2>11. Automatisierte Entscheidungen</h2>
        <p>
          Derzeit treffen wir keine ausschliesslich automatisierten Einzelentscheidungen mit
          rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung. Sicherheitsmechanismen
          wie Rate Limits können Anfragen vorübergehend blockieren. Moderationsentscheidungen
          werden durch berechtigte Personen getroffen.
        </p>
      </section>

      <section>
        <h2>12. Änderungen</h2>
        <p>
          Wir können diese Datenschutzerklärung anpassen, wenn sich Funktionen, Dienstleister oder
          rechtliche Anforderungen ändern. Die jeweils aktuelle Version wird auf dieser Seite mit
          Versionsnummer und Datum veröffentlicht.
        </p>
      </section>
    </LegalPageLayout>
  );
}
