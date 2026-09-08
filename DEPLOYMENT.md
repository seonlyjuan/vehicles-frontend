# Frontend bereitstellen

Der Client ist ein eigenes Git-Repository. Alle Befehle hier werden im Ordner
`client` ausgeführt. Node **26.4.0** ist in `.node-version` festgeschrieben;
`npm ci` installiert exakt aus `package-lock.json`.

## Build für einen Static Hoster

Die Werte aus `.env.production.example` im Hostingdienst als Build-Variablen
setzen oder in einer privaten `.env.production` hinterlegen:

- `VITE_API_URL`: öffentliche HTTPS-Adresse der API.
- `VITE_SUPABASE_URL`: HTTPS-Adresse des Supabase-Projekts.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: öffentlicher Publishable Key.
  Ein bestehender Legacy-Anon-Key wird über `VITE_SUPABASE_ANON_KEY` unterstützt.

Diese Werte landen im Browser und dürfen keine Servergeheimnisse enthalten.
Der Build lehnt fehlende öffentliche Schlüssel sowie Secret-/Service-Role-Keys
ab. Eine geänderte Variable erfordert einen neuen Build.

```sh
npm ci
npm run lint
npm test
npm run build
```

Den Inhalt von `dist` veröffentlichen. Im Hoster einen Rewrite unbekannter
Seitenpfade auf `/index.html` mit Status 200 einrichten, damit etwa
`/profile/settings` oder `/legal/agb` auch direkt geöffnet werden können.
Fehlende `/assets/*`-Dateien müssen weiterhin 404 liefern. HTML soll bei neuen
Deployments erneut geprüft werden; Dateien mit Hash im Namen können lange
gecached werden. Das lokale `npm run dev` und `vite preview` sind keine
Produktionsdienste.

## Docker als Alternative

Mit den drei öffentlichen Variablen bereits in der Shell-Umgebung:

```sh
docker build -t vehicle-client --build-arg VITE_API_URL --build-arg VITE_SUPABASE_URL --build-arg VITE_SUPABASE_PUBLISHABLE_KEY .
docker run -p 127.0.0.1:8080:8080 --restart unless-stopped vehicle-client
```

Docker liest `.env.production` nicht automatisch als Build-Argumente ein.
Die Variablen im Hostingdienst oder der Shell setzen. Der Container erwartet
den neuen Publishable Key; beim direkten Vite-Build funktioniert zusätzlich
der Legacy-Anon-Key.

Das Image baut den Client und liefert ihn über Nginx auf Port `8080` aus.
`deploy/nginx.conf` enthält SPA-Fallback, Cache-Einstellungen und Sicherheitsheader.
`GET /health` liefert einen einfachen Status für den Hoster.
Lokale `.env`-Dateien sind vom Docker-Build ausgeschlossen. Nur öffentliche
Browserwerte als Build-Argumente übergeben; siehe
[Docker-Buildvariablen](https://docs.docker.com/build/building/variables/).

Der Hostingdienst stellt HTTPS und das Zertifikat vor dem Container bereit.
Seine HTTPS-Adresse muss später zu `CLIENT_ORIGIN` im Backend und den
Supabase-Login-Weiterleitungen passen. Die aktuelle Vorbereitung trägt keine
echte Domain ein und veröffentlicht die Anwendung nicht.

## Automatische Prüfungen

`.github/workflows/ci.yml` prüft Installation aus dem Lockfile, ESLint,
Konfigurationsprüfungen und Produktionsbuild. Anschliessend wird das
Docker-Image gebaut und direkte Seitenaufrufe sowie fehlende Assets geprüft.
Die CI verwendet ausschliesslich künstliche Build-Werte und veröffentlicht
kein Image oder Deployment. Container-Basisimages müssen bei Wartungsarbeiten
ebenfalls aktualisiert werden; der Nginx-Tag `stable-alpine` erhält Updates.
