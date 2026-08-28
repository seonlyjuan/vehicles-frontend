# Client lokal und im WLAN starten

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

Vite zeigt danach eine `Network`-Adresse wie `http://192.168.1.50:5173/` an.
Diese Adresse auf dem Smartphone öffnen. Smartphone und Computer müssen im
selben WLAN sein.

API-Aufrufe laufen in der lokalen Entwicklung über den Vite-Pfad `/api` und
werden intern an FastAPI auf Port `8000` weitergeleitet.

Für den Google-Login muss diese Adresse zusätzlich in Supabase unter
`Authentication > URL Configuration > Redirect URLs` eingetragen werden,
beispielsweise als `http://192.168.1.50:5173/**`.
