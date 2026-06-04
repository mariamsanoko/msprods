# MS Prods Airtable Brain

Production-ready chatbot for [msprods.fr](https://www.msprods.fr) powered by Airtable (`MSPRODS_BRAIN`) and the OpenAI Responses API.

## Features

- Floating HTML/CSS/JS chat widget on every site page.
- `POST /chat` Node.js + Express endpoint.
- Airtable-backed answers from:
  - `FORMATIONS`
  - `FAQ`
  - `PARCOURS`
- Top 3 keyword/semantic matches per table before every OpenAI call.
- Strict French assistant prompt that prevents invented courses, prices, and durations.
- Session memory in `localStorage`.
- Typing/loading animation.
- Quick buttons: `Formations`, `Prix`, `Parcours recommandé`.
- Recommended path engine based on user intent and Airtable matches.
- Optional lead capture: if a user sends an email and `AIRTABLE_LEADS_TABLE` is configured, the backend writes the lead to Airtable.
- Backend-only API keys via `.env` with Airtable SDK custom configuration.

## Architecture diagram

```text
Browser / msprods.fr
  └─ public/chat-widget.js + public/chat-widget.css
      ├─ localStorage session memory
      ├─ quick buttons + typing animation
      └─ POST /chat { message, history }
            ↓
Node.js Express backend (server.js)
  ├─ security: helmet, CORS, rate limit, JSON size limit
  ├─ src/airtable.js
  │   ├─ fetch FORMATIONS, FAQ, PARCOURS from Airtable
  │   ├─ keyword relevance scoring
  │   └─ optional LEADS capture
  ├─ src/recommendation-engine.js
  │   └─ recommended learning path signal engine
  └─ src/chat-service.js
      ├─ injects Airtable-only context
      ├─ calls OpenAI Responses API
      └─ returns concise French answer
            ↓
OpenAI model: gpt-4.1-mini
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in:

```dotenv
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4.1-mini
AIRTABLE_API_KEY=pat-your-airtable-token
AIRTABLE_ENDPOINT_URL=https://api.airtable.com
AIRTABLE_BASE_ID=appjOZNBgGsu0P6cA
AIRTABLE_FORMATIONS_TABLE=FORMATIONS
AIRTABLE_FAQ_TABLE=FAQ
AIRTABLE_PARCOURS_TABLE=PARCOURS
AIRTABLE_LEADS_TABLE=LEADS
```

If your frontend is hosted on another origin, add it to `ALLOWED_ORIGINS`.

### Airtable SDK connection

The backend uses the official `airtable` Node.js package and configures it server-side with the MS Prods base ID:

```js
Airtable.configure({
  endpointUrl: process.env.AIRTABLE_ENDPOINT_URL || 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID || 'appjOZNBgGsu0P6cA');
```

Keep the personal access token in `.env` only. The default base is `appjOZNBgGsu0P6cA`, but you can override it with `AIRTABLE_BASE_ID`.

### 3. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Health check:

```bash
curl http://localhost:3000/health
```

### 4. Test the chat endpoint

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Je veux automatiser mes relances clients. Quelle formation recommandes-tu ?","history":[]}'
```

## Airtable structure

The backend reads all fields from each configured table, so exact field names can evolve. Recommended fields:

### FORMATIONS

- `Nom`
- `Description`
- `Objectifs`
- `Niveau`
- `Prix`
- `Durée`
- `URL`
- `Tags`

### FAQ

- `Question`
- `Réponse`
- `Catégorie`
- `Tags`

### PARCOURS

- `Nom`
- `Profil cible`
- `Objectif`
- `Formations incluses`
- `Ordre conseillé`
- `Résultat attendu`

### LEADS (optional)

- `Email`
- `Nom`
- `Source`
- `Message`
- `Parcours recommande`
- `Date`

## Deployment notes

- Keep `.env` and real API keys only on the backend server.
- The frontend widget calls `/chat` by default. If the API is on another domain, define before loading the widget:

```html
<script>
  window.MSPRODS_CHAT_API_URL = "https://api.msprods.fr/chat";
</script>
<script src="public/chat-widget.js" defer></script>
```

- Deploy Node.js with `npm start`.
- Ensure HTTPS is enabled in production.
- Configure `ALLOWED_ORIGINS` with `https://www.msprods.fr` and `https://msprods.fr`.

## Security

- Airtable and OpenAI keys never appear in the frontend.
- Request body is limited to 32 KB.
- Rate limit: 30 requests/minute per client IP.
- CORS allowlist is configurable.
- The system prompt instructs the assistant to use only injected Airtable records for factual claims.
