# Állatmenhely Webalkalmazás

Ez a projekt egy **MEAN stack** (MongoDB, Express, Angular, Node.js) alapú állatmenhely menedzsment rendszer.  
Felhasználók számára lehetőséget biztosít állatok böngészésére, kedvencek kijelölésére, örökbefogadási kérelmek küldésére és támogatási (support) üzenetek írására.  
Adminisztrátorok állatokat adhatnak hozzá, kezelhetik az örökbefogadási kérelmeket és support kérdéseket.

---

## Használt technológiák

- **Frontend**: Angular 17+ (standalone komponensek)
- **Backend**: Node.js, Express, TypeScript
- **Adatbázis**: MongoDB (Docker konténerben)
- **Autentikáció**: JWT (JSON Web Token)
- **Kommunikáció**: REST API

---

## Funkciók

### Felhasználók

- Regisztráció / Bejelentkezés (JWT alapú hitelesítéssel)
- Állatok böngészése, részletek megtekintése
- Kedvenc állatok megjelölése
- Örökbefogadási kérelem beküldése
- Support kérdések írása adminoknak, oda-vissza válasz lehetőséggel
- Profiloldal, ahol fiók törlés és jelszócsere is elérhető

### Adminisztrátorok

- Állatok hozzáadása / szerkesztése / törlése
- Örökbefogadási kérelmek áttekintése, időpontok kezelése
- Support kérdésekre válaszadás
- Jogosultság-alapú hozzáférés az admin felülethez

---

## Telepítés és futtatás

### Előfeltételek

- [Node.js](https://nodejs.org/) (ajánlott: 18.x vagy újabb)
- [Angular CLI](https://angular.io/cli)  
  Telepítés: `npm install -g @angular/cli`
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Internetkapcsolat a szükséges csomagok letöltéséhez

---

### 1. MongoDB konténer indítása

Nyisd meg a terminált, majd navigálj a `database` mappába:

```
cd database
```
Ha még nem hoztad létre csináld meg az image-t a docker fáj-ból:

```
docker build -t menhely-mongo-image .

```

Ha a konténer már létezik, indítsd el:

```
docker start menhely-mongo
```

Ha még nem létezik, hozz létre egy új konténert:

```
docker run -d -p 27017:27017 --name menhely-mongo menhely-mongo-image
```

---

### 2. Backend indítása

Navigálj a `backend` mappába a fő mappából:

```
cd backend
```

Telepítsd a szükséges csomagokat:

```
npm i --save-dev @types/cors
npm install multer
```

Győződj meg róla, hogy a .env fájl jelen van a backend mappában, és tartalmazza a szükséges környezeti változókat (PORT=5000).

Indítsd el a szervert TypeScript-ből:

```
npx ts-node-dev src/index.ts
```

A backend a .env fájlban megadott porton (5000) fog futni, tehát alapértelmezetten a http://localhost:5000 címen lesz elérhető.

---

### 3. Frontend indítása


A fő mappában telepítsd az Angular függőségeket:

```
npm install
```

Majd indítsd el a fejlesztői szervert:

```
ng serve
```

Ezután a webalkalmazás elérhető a böngészőből: `http://localhost:4200`
