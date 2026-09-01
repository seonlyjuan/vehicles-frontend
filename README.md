# Client lokal und im WLAN starten
--------------------------------------------------------------------------------

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

```

--------------------------------------------------------------------------------

```powershell
npm.cmd run dev
```

--------------------------------------------------------------------------------

Vite zeigt danach eine `Network`-Adresse wie `http://192.168.1.50:5173/` an.
Diese Adresse auf dem Smartphone öffnen. Smartphone und Computer müssen im
selben WLAN sein.

--------------------------------------------------------------------------------

Für den Google-Login muss diese Adresse zusätzlich in Supabase unter
`Authentication > URL Configuration > Redirect URLs` eingetragen werden,
beispielsweise als `http://192.168.1.50:5173/**`.

Der Login verwendet den OAuth-PKCE-Flow. Nach der Weiterleitung steht nur ein
kurzlebiger Autorisierungscode in der URL; Access- und Refresh-Token werden
nicht im URL-Fragment übertragen. OAuth-Parameter werden nach der Verarbeitung
aus der Adresszeile entfernt.

## Produktions-Build

Beim Deployment müssen `VITE_API_URL` und `VITE_SUPABASE_URL` als vollständige
HTTPS-Adressen gesetzt sein. `npm.cmd run build` bricht bewusst ab, wenn noch
eine lokale HTTP-Adresse konfiguriert ist. Der Build fügt anhand dieser Adressen
eine restriktive Content Security Policy in die ausgelieferte HTML-Datei ein.

## Rechtstexte

Impressum, Datenschutzerklärung und AGB sind als öffentliche HTML-Seiten unter
`/legal/impressum`, `/legal/datenschutz` und `/legal/agb` erreichbar. Die
gemeinsam verwendeten Betreiber-Platzhalter und der Dokumentstand werden in
`src/config/legal.js` gepflegt. Vor dem öffentlichen Launch müssen sämtliche
Platzhalter ersetzt und die Texte rechtlich geprüft werden.

--------------------------------------------------------------------------------
