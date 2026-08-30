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

--------------------------------------------------------------------------------