# Grooves — Vinyl Cataloguer

Photograph a record sleeve or label, identify it on Discogs, and build a searchable catalogue you can export to CSV.

## First-time setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Build for production
```bash
npm run build
```

## Deploying to Netlify

### Option A — via GitHub (recommended, auto-deploys on every push)

1. Push this folder to a GitHub repo:
```bash
git init
git add .
git commit -m "initial commit"
gh repo create vinyl-cataloguer --public --push --source=.
```

2. Go to netlify.com → Add new site → Import from Git
3. Pick your repo — build settings are auto-detected from netlify.toml
4. Click Deploy. Done.

**After that, every update is just:**
```bash
git add . && git commit -m "update" && git push
```
Netlify rebuilds automatically in ~30 seconds.

### Option B — drag and drop (no GitHub needed)

```bash
npm run build
```
Then drag the `dist/` folder onto netlify.com/drop.

## App settings

Open ⚙ Settings in the app and enter:
- **Claude API key** — from console.anthropic.com (needed for image recognition)
- **Discogs token** — from discogs.com → Settings → Developers (optional but recommended)

Both are saved in your browser's localStorage — you only need to enter them once.

## Updating the app

When you get a new version of App.jsx from Claude:
1. Replace `src/App.jsx` with the new code
2. `git add . && git commit -m "update" && git push`
3. Netlify deploys in ~30 seconds
