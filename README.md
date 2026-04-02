# CS2 Demo Hub

> A web platform where CS2 players can log in with their Steam account, view their recent match history, and download demo (.dem) files — with a clean, dark-themed UI.

![CS2 Demo Hub Screenshot](docs/screenshot-placeholder.png)

---

## ✨ Features

- 🔐 **Steam OpenID 2.0 authentication** — log in with your Steam account
- 📋 **Match history** — view your last 8 CS2 competitive matches
- 📊 **Detailed stats** — K/D/A, HS%, ADR, and Rating per match
- ⬇️ **Demo downloads** — one-click download of `.dem` replay files
- 🌙 **Dark CS2-themed UI** — responsive design built with Tailwind CSS
- 🛠 **Dev mode** — works with mock data, no Steam API key required

---

## 🛠 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Axios |
| Backend   | Node.js, Express, TypeScript, Passport (Steam OpenID) |
| Auth      | Steam OpenID 2.0 via `passport-steam`           |
| Session   | `express-session` (in-memory for dev)           |
| Container | Docker + Docker Compose                         |

---

## 🚀 Quick Start (Local Dev)

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone the repository

```bash
git clone https://github.com/daleksevych-boop/cs2-demo-hub.git
cd cs2-demo-hub
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Edit .env and fill in your values (see below)
npm install
npm run dev
```

The backend starts on **http://localhost:3001**.

### 3. Set up the frontend

```bash
# In a new terminal tab
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**.

### 4. Open the app

Visit **http://localhost:5173** and click **"Login with Steam"**.

> **Note:** In `NODE_ENV=development` the `/api/matches` endpoint returns mock data, so you can use the app without a real Steam API key.

---

## 🐳 Docker Compose

```bash
# Copy .env for backend first
cp backend/.env.example backend/.env

docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3001

---

## ⚙️ Environment Variables

Create `backend/.env` (copy from `backend/.env.example`):

| Variable        | Description                                  | Default                    |
|-----------------|----------------------------------------------|----------------------------|
| `STEAM_API_KEY` | Your Steam Web API key (see below)           | —                          |
| `SESSION_SECRET`| Secret for signing session cookies           | —                          |
| `FRONTEND_URL`  | URL of the frontend app                      | `http://localhost:5173`    |
| `PORT`          | Port for the backend server                  | `3001`                     |
| `NODE_ENV`      | `development` or `production`                | `development`              |

### How to get a Steam API Key

1. Visit https://steamcommunity.com/dev/apikey
2. Log in with your Steam account
3. Enter a domain name (use `localhost` for development)
4. Copy the generated key into `STEAM_API_KEY`

---

## ⚠️ Known Limitations

- Valve's public API only exposes the **last 8 competitive matches**
- Demo files must be downloaded within **~21 days** of the match (Valve deletes them)
- Demo URLs in development mode are placeholders (`example.com`)

---

## 🗺 Roadmap

### Phase 2
- [ ] 2D map demo viewer (draw player paths on a mini-map)
- [ ] Kill heatmaps per map
- [ ] FACEIT integration (match history + Elo tracker)
- [ ] Per-round stats timeline
- [ ] Share match card as image

---

## 📄 License

MIT