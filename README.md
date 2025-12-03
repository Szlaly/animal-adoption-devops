# DevOps - Állatmenhely Platform

Ez az útmutató az Állatmenhely Platform teljes DevOps infrastruktúráját fedi le.
Az alap app egy sima állatmenhely oldal MEAN stack alapon
---

## Tartalomjegyzék

1. [Előfeltételek](#előfeltételek)
2. [Használt technológiák](#használt-technológiák)
3. [Docker File-ok](#docker-file-ok)
4. [Docker Compose-ok](#docker-compose-ok)
5. [Első futtatás Útmutató](#első-futtatás-útmutató)

---

## Előfeltételek

### Rendszerkövetelmények

- **Operációs rendszer**: Linux, macOS vagy Windows

### Szükséges szoftver

#### 1. Docker
Telepítsd a Docker Desktop-ot vagy Docker Engine-t:
- **Linux**: [Docker Engine Telepítés](https://docs.docker.com/engine/install/)
- **macOS/Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop)

Ellenőrzés:
```bash
docker --version
```

#### 2. Docker Compose
Általában része a Docker Desktop-nak. Ellenőrzés:
```bash
docker compose version
```

Ha nincs telepítve, követsd a [telepítési útmutatót](https://docs.docker.com/compose/install/).

#### 3. Ansible (az üzembe helyezési automatizáláshoz)
```bash
# Linux (Ubuntu/Debian)
sudo apt-get install ansible

# macOS (Homebrew használatával)
brew install ansible

# pip segítségével (bármilyen OS)
pip install ansible
```

Ellenőrzés:
```bash
ansible --version
```

#### 4. Git
```bash
git --version
```

#### 5. Node.js (helyi fejlesztéshez)
Telepítsd a [Node.js 18.x vagy újabbat](https://nodejs.org/). Szükséges a következőkhöz:
- Tesztek futtatása helyileg
- Frontend/backend építése Docker nélkül

---

## Használt technológiák

- Jenkins: CI és pipeline futtatás (építés, tesztek, deploy).
- Ansible: automatizált telepítés és konfiguráció (deploy playbook).
- Prometheus: metrikagyűjtés a backendből.
- Grafana: metrikák vizualizálása és dashboardok.
- Graylog: naplók gyűjtése és elemzése.
- Nginx: reverse proxy és frontend statikus fájlok kiszolgálása.
- Elasticsearch: Graylog naplótároló és indexelés.

---

## Docker File-ok

- **Dockerfile.backend**: Multi-stage build - TypeScript fordítása, Node.js futtatása az 5000-es porton
- **Dockerfile.frontend**: Multi-stage build - Angular építése, Nginx-en való servírozása az 80-as porton
- **Dockerfile.ansible**: Containerizált Ansible környezet üzembe helyezési eszközökkel
- **Dockerfile.jenkins**: Jenkins CI/CD szerver a folyamat automatizálásához

---

## Docker Compose-ok

### Fő Stack (`docker-compose.yml`)

Az alkalmazás alapvető szolgáltatásait orkestrál Docker-tárolókban.

**Szolgáltatások**:
- **MongoDB** (port 27017): NoSQL adatbázis állandó kötettel és automatikus demo adattal
- **Backend** (port 5000): Node.js/Express API MongoDB-hez csatlakozva
- **Frontend** (port 80): Nginx webszerver Angular alkalmazást servíroz fordított proxy-val a backendhez
- **Ansible** (segédeszköz): Containerizált Ansible üzembe helyezési automatizáláshoz

**Hálózat**: Összes szolgáltatás a `shared-net` bridge hálózaton keresztül kommunikál (Docker DNS feloldás)

### Monitoring Stack (`docker-compose.monitoring.yml`)

Opcionális megfigyelési szolgáltatások (külön indítódnak):
- **Prometheus** (9090): Metrikagyűjtés a backend-ből
- **Grafana** (3000): Metrikai vizualizációs irányítópult
- **Elasticsearch** (9200): Napló tárolás és indexelés
- **Graylog** (9000): Központosított naplózás és napló aggregáció

### Jenkins Stack (`docker-compose.jenkins.yml`)

CI/CD automatizálási szerver:
- **Jenkins** (8080): Folyamatkezelési web felület; Docker szoketet csatlakoztat a tároló építéshez

---

## Nginx Konfiguráció (`nginx.conf`)

Fordított proxy, amely átirányítja a forgalmat:
- `/api/*` kérések → Backend (port 5000)
- Összes többi kérés → Frontend statikus fájlok

---


## Első futtatás Útmutató

### Elsődleges munkafolyamat: Jenkins CI/CD folyamat

A Jenkins folyamat **teljes mértékben automatizálja** a teljes DevOps munkafolyamatot. Ez az ajánlott megközelítés a feladathoz:

```bash
# 1. Jenkins indítása
docker compose -f docker/docker-compose.jenkins.yml up -d

# 2. Jenkins Web felület megnyitása
Nyisd meg a böngészőben: http://localhost:8080

# 3. Kezdeti admin jelszó lekérése
docker logs menhely-jenkins 

# 4. Jenkins beállítása elvégzése
 - Add meg a felhasználó nevet (admin) majd a most kapott jelszót és lépj be
 - Telepítsd az ajánlott bővítményeket
 - Hozz létre rendszergazda felhasználót

# 5. Folyamat feladat létrehozása
 - Új elem → Pipeline
 - Név: "Animal Adoption Pipeline" (vagy amit akarsz)
 - Folyamat szakasz:
   - Definíció: Pipeline script from SCM
   - SCM: Git
   - Tárház URL: <ennek a repositorynak az URL-je>
   - Branch: */main
   - Script útvonala: jenkins/Jenkinsfile

# 6. Építsd meg a folyamatot
 - Mentés
 - Build előtt telepítsd a Docker pipeline plugint a settingsben
 - Kattints a "Build Now" gombra
 - Nézd a konzol kimenetét
```

**Mit csinál a folyamat automatikusan:**
- ✅ Kód lekérése
- ✅ Backend tesztek futtatása (Jest)
- ✅ Frontend tesztek futtatása (Cypress/Angular)
- ✅ Backend építés (TypeScript fordítás)
- ✅ Frontend építés (Angular termelési build)
- ✅ Docker képek létrehozása
- ✅ Üzembe helyezés Ansible-en keresztül (fő app stack + monitoring)
- ✅ Összes szolgáltatás indítása (MongoDB, Backend, Frontend, Nginx, Prometheus, Grafana, Graylog)

**Sikeres építés után, hozzáférés a szolgáltatásokhoz:**
- Frontend: `http://localhost` (Nginx)
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

---

### Monitoring & Logging Setup

A Jenkins építés befejezése után a monitoring és naplózás szolgáltatások automatikusan indulnak. Ezeket konfigurálnod kell az első futtatáskor:

#### Prometheus (9090)

**Access**: `http://localhost:9090`

1. Nyisd meg a web UI-t
2. A **Status** → **Target health** oldalon ellenőrizd, hogy a backend célpont látható-e
3. A **Query** fülön próbálj ki lekérdezéseket (pl: up, process_cpu_seconds_total) stb. → **Execute**

---

#### Grafana (3000)

**Elérés**: `http://localhost:3000`

**Bejelentkezés:**
- Felhasználónév: `admin`
- Jelszó: `adminpassword`

**Prometheus adatforrás hozzáadása:**
1. Bejelentkezés után, bal oldali menü → **Connections**  → **Data sources**
4. Válaszd a **Prometheus** lehetőséget
5. Adatok kitöltése:
   - Név: `Prometheus`
   - URL: `http://prometheus:9090`
6. **Save & test** gomb
7. Ha sikeres az adatforrás létrehozása, elkezdhetesz irányítópultokat és grafikonokat készíteni bal oldalt a **Dashboards** menüben

---

#### Graylog (9000)

**Elérés**: `http://localhost:9000`

**Bejelentkezés:**
- Felhasználónév: `admin`
- Jelszó: `adminpassword`

**GELF bemenet beállítása (naplók fogadásához):**

1. Bejelentkezés után, fenti menü → **System** → **Inputs**
2. A jobb oldalon válaszd az **Syslog UDP** lehetőséget az "Inputs" legördülő menüből
3. **Launch new input** gomb
4. Adatok kitöltése:
   - Adj title-t
   - Node: válassz egy node-ot
   - Bind address `0.0.0.0` maradhat
   - Port `5140` legyen
   - **Launch** gomb
5. Az input most **Running** állapotban van és fogadja a naplókat az UDP 5140-es porton

**Naplók megtekintése:**
1. A bal oldali menüben **Search**
2. Itt megjeleníti az összes bejövő naplót
3. Szűrhetsz időintervallumra, üzenettípusra stb.

---


