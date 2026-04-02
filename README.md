# CS2 Demo Hub

> **A web platform where CS2 players can log in with their Steam account, view their recent match history, and download demo (.dem) files — with a clean, dark, modern UI.**

<!-- Screenshot placeholder -->
<!-- ![CS2 Demo Hub Screenshot](./screenshot.png) -->

---

## ✨ Features

- 🔐 **Steam OpenID login** — authenticate with your real Steam account
- 📋 **Match history** — view your last 8 CS2 matches at a glance
- ⬇ **Demo downloads** — one-click download of available .dem files
- 📊 **Match stats** — K/D/A, headshot %, ADR, and rating per game
- 🎨 **Dark CS2 theme** — #0F1117 background, orange accent (#F6A623)
- 🛡 **Development mock data** — works without a real Steam API key

---

## 🛠 Tech Stack

| Layer     | Technology                                     |
|-----------|------------------------------------------------|
| Backend   | Node.js · Express · TypeScript                 |
| Auth      | Passport.js · passport-steam (Steam OpenID 2.0)|
| Session   | express-session (in-memory, dev)               |
| HTTP      | Axios                                          |
| Frontend  | React 18 · TypeScript · Vite                   |
| Styling   | Tailwind CSS                                   |
| Routing   | React Router v6                                |
| Container | Docker · Docker Compose                        |

---

## 🚀 Quick Start (Local Dev)

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Clone & install

```bash
git clone https://github.com/your-username/cs2-demo-hub.git
cd cs2-demo-hub

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env — add your Steam API key and a session secret
```

### 3. Run backend

```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

### 4. Run frontend

```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🐳 Docker Compose

```bash
# Copy and edit the .env file first
cp backend/.env.example backend/.env

docker-compose up --build
```

- Frontend → http://localhost:5173
- Backend  → http://localhost:3001

---

## 🔑 Environment Variables

| Variable        | Description                                       | Example                     |
|-----------------|---------------------------------------------------|-----------------------------|
| `STEAM_API_KEY` | Steam Web API key (get it at steamcommunity.com)  | `ABCDEF1234567890`          |
| `SESSION_SECRET`| Secret string used to sign session cookies        | `my-super-secret`           |
| `FRONTEND_URL`  | Frontend origin for CORS & redirects              | `http://localhost:5173`     |
| `PORT`          | Backend port                                      | `3001`                      |
| `NODE_ENV`      | `development` returns mock match data             | `development`               |

---

## 🔑 How to Get a Steam API Key

1. Go to **https://steamcommunity.com/dev/apikey**
2. Log in with your Steam account
3. Enter any domain (e.g. `localhost`) and click **Register**
4. Copy the key into `backend/.env` as `STEAM_API_KEY`

---

## ⚠️ Limitations

- Valve's `GetMatchHistory` API is **deprecated** and only returns the last ~8 recent matches for CS2.
- Demo availability depends on Valve's servers; demos expire after a period.
- In `NODE_ENV=development`, the app returns **mock data** so it works without a real Steam API key.

---

## 🗺 Roadmap

### Phase 2
- [ ] 2D round replay viewer (CS2 map + player positions)
- [ ] Per-round heatmaps (kills, deaths, flashes)
- [ ] FACEIT integration — fetch FACEIT matches and ELO
- [ ] PostgreSQL + Redis for persistent sessions & caching
- [ ] User settings (preferred maps, stats filters)

---

## 📄 License

MIT