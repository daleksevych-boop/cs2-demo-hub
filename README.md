# CS2 Demo Hub

> 🎮 View and download your CS2 match demos in one place.

![CS2 Demo Hub Screenshot](https://via.placeholder.com/900x500/0F1117/F6A623?text=CS2+Demo+Hub+Screenshot)

---

## ✨ Features

- 🔑 **Steam OpenID Login** — sign in with your Steam account, no password needed
- 📋 **Match History** — view your last 8 CS2 competitive matches
- ⬇️ **Download Demos** — one-click `.dem` file downloads
- 📊 **Detailed Stats** — K/D/A, HS%, ADR, Rating per match
- 🌙 **Dark CS2-Themed UI** — built with Tailwind CSS

---

## 🛠 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS, React Router v6 |
| Backend   | Node.js, Express, TypeScript                    |
| Auth      | Passport.js + passport-steam (Steam OpenID 2.0) |
| HTTP      | Axios                                           |
| Dev       | Docker Compose, ts-node-dev                     |

---

## 🚀 Quick Start (Local Dev)

### Prerequisites

- Node.js 18+
- npm 9+
- (Optional) Docker & Docker Compose

### 1. Clone the repo

```bash
git clone https://github.com/daleksevych-boop/cs2-demo-hub.git
cd cs2-demo-hub
```

### 2. Set up backend

```bash
cd backend
cp .env.example .env
# Edit .env with your Steam API key and session secret
npm install
npm run dev
```

### 3. Set up frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

> **Note:** In `NODE_ENV=development` (default), the `/api/matches` endpoint returns **mock data** — no real Steam API key is needed to explore the UI.

---

### 🐳 Run with Docker Compose

```bash
# Copy and fill in your backend .env
cp backend/.env.example backend/.env

docker-compose up --build
```

---

## ⚙️ Environment Variables

Create `backend/.env` (copy from `.env.example`):

| Variable         | Description                                     | Example                    |
|------------------|-------------------------------------------------|----------------------------|
| `STEAM_API_KEY`  | Your Steam Web API key                          | `ABCDEF123456...`          |
| `SESSION_SECRET` | Random secret for express-session               | `super-secret-string`      |
| `FRONTEND_URL`   | Frontend origin for CORS and redirects          | `http://localhost:5173`    |
| `PORT`           | Backend port                                    | `3001`                     |
| `NODE_ENV`       | `development` uses mock data, `production` uses real API | `development`     |

---

## 🔑 How to Get a Steam API Key

1. Go to [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
2. Log in with your Steam account
3. Enter a domain name (use `localhost` for dev)
4. Copy the key into `backend/.env` as `STEAM_API_KEY`

---

## ⚠️ Limitations

- Valve's CS2 API only exposes the **last 8 matches** per player
- Demo files are hosted by Valve and expire after ~21 days
- Match history requires your Steam profile to be **public**

---

## 🗺 Roadmap

### Phase 2
- [ ] 2D round replay viewer
- [ ] Kill heatmaps per map
- [ ] FACEIT integration (leagues, ELO history)
- [ ] Demo analysis: grenades, positions, economy
- [ ] Multi-player comparison

---

## 📄 License

MIT
