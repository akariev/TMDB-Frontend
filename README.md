# TMDB-Frontend

React-projekt oprettet med Vite som bundler. Projektet er designet til at være en letvægtsapplikation, der bruger moderne frontend-teknologier for at sikre hurtig udvikling og ydeevne.

## Demo 

En live demo af MovieDB kan findes her:
[MovieDB Demo](https://moviedb-flame-six.vercel.app/)

## Teknologistack

### Frontend

- **React**: En populær JavaScript-bibliotek til opbygning af brugergrænseflader.
- **React Router DOM**: Anvendes til klient-side routing i React applikationer.
- **Shadcn UI**: Et stilfuldt og fleksibelt komponentbibliotek, der gør det nemt at bygge moderne brugergrænseflader med minimal indsats.
- **Radix UI**: Komponenter til hurtigt at bygge moderne UI med Radix-principper.
- **Tailwind CSS & Tailwind CSS Animate**: Utility-first CSS framework for styling og animationer.

### State Management

- **Zustand**: En lille, hurtig og skalerbar state management løsning til React.

### Ikoner

- **Lucide React**: Et open-source ikonbibliotek.

### Bygning og Udvikling

- **Vite**: En hurtigere alternativ bundler til moderne frontend projekter.
  
### Linting og Kvalitetskontrol

- **ESLint & Plugins**: Bruges til at finde og rette problemer i JavaScript/React kode.
  
### Typechecking

- **TypeScript & Related Libraries**: Tilføjer statisk typekontrol til JavaScript-koden for bedre vedligeholdelse og færre fejl.

## Backend Krav

For at køre dette projekt skal du have adgang til en backend API. Du har to muligheder:

1. Kør din egen backend lokalt ved hjælp af [TMDB API](https://github.com/akariev/TMDB-Api).
   
2. Brug den hostede version af API'et på Azure ved hjælp af følgende URL:
   - [API Swagger Dokumentation](https://tmdb-bsfkf9fse2avh7hc.germanywestcentral-01.azurewebsites.net/swagger/index.html)

## Miljøvariabler

Du skal definere `API_URL` i en `.env` fil i roden af projektet, der peger på den valgte backend service.

```plaintext
API_URL=<din_api_url>
```

Eksempel for Azure hosted API:

```plaintext
API_URL=https://tmdb-bsfkf9fse2avh7hc.germanywestcentral-01.azurewebsites.net/api
```

## Scripts

Projektet indeholder flere scripts, der gør det nemt at starte udviklingsserveren, bygge projektet osv.:

- `dev`: Starter en udviklingsserver ved hjælp af Vite.
  
  ```bash
  npm run dev
  ```

- `build`: Bygger projektet ved hjælp af TypeScript Compiler (TSC) efterfulgt af Vite build-processen.

  ```bash
  npm run build
  ```

- `lint`: Kører ESLint på hele projektet for at sikre koden overholder specifikke stilregler.

  ```bash
  npm run lint
  ```

- `preview`: Starter en forhåndsvisningsserver, så man kan se det byggede projekt.

  ```bash
  npm run preview
  ```

## Installation

For at komme i gang med dette projekt skal du have Node.js installeret. Følg disse trin:

1. Klon repository'et:

   ```bash
   git clone https://github.com/akariev/TMDB-Frontend.git
   cd TMDB-Frontend
   ```

2. Installer afhængigheder:

   ```bash
   npm install
   ```

3. Konfigurer miljøvariablerne i `.env` filen som beskrevet ovenfor.

4. Start udviklingsserveren:

   ```bash
   npm run dev
   ```

5. Åbn din browser på `http://localhost:<port>` for at se applikationen køre lokalt (typisk porten vil være angivet i konsollen).
