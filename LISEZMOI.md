# Chat en cavale — version PWA

## Contenu
- index.html : le jeu (police intégrée, aucune dépendance externe)
- manifest.webmanifest, sw.js : installation + mode hors ligne
- icons/, fonts/

## Tester sur ton téléphone
Une PWA doit être servie en HTTPS (ou sur localhost). Le plus simple, gratuit :
1. **Netlify Drop** (app.netlify.com/drop) : glisse-dépose le dossier, tu obtiens une URL https.
   Alternatives : GitHub Pages, Cloudflare Pages, Vercel.
2. Ouvre l'URL sur ton téléphone.
   - **Android (Chrome)** : menu ⋮ → « Installer l'application ».
   - **iPhone (Safari)** : Partager → « Sur l'écran d'accueil ».
3. Lance depuis l'icône : plein écran, et ça marche sans réseau après la première ouverture.

## Test en local (ordinateur)
    cd dossier && python3 -m http.server 8000   (puis http://localhost:8000)

## Mettre à jour
Modifie index.html, puis change VERSION dans sw.js (ex. 'v2') avant de republier.
La sauvegarde (localStorage, clé cc-save-v2) est conservée.
