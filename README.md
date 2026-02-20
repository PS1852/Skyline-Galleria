# Skyline Galleria 🏬

> A production-ready, fully responsive shopping mall website built with React, TypeScript, and Tailwind CSS v4.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📸 Screenshots

| Home Page | Store Directory | Parking Status |
|-----------|----------------|----------------|
| ![Home](docs/home.png) | ![Directory](docs/directory.png) | ![Parking](docs/parking.png) |

| Events | Store Detail | Dark Mode |
|--------|-------------|-----------|
| ![Events](docs/events.png) | ![Store](docs/store-detail.png) | ![Dark](docs/dark-mode.png) |

---

## ✨ Features

- **Hero Slider** – Auto-playing, keyboard-accessible image carousel with prev/next controls and dot indicators.
- **Store Directory** – Search, category, and floor filters with animated results grid.
- **Store Details** – Full store page with image hero, store info, favourite toggle, and customer reviews.
- **Events Page** – Live countdown timer to the next event with RSVP toggle on each card.
- **Live Parking** – Simulated real-time parking availability with progress bars and status badges.
- **User Account** – LocalStorage-based auth simulation with favourites and settings tabs.
- **Contact Form** – Validated contact form with per-field error messages.
- **Dark / Light Mode** – System-preference-aware with a manual toggle, persisted to localStorage.
- **Responsive Design** – Fully responsive across mobile, tablet, and desktop.
- **Accessibility** – ARIA labels, semantic HTML, keyboard navigation, `role="dialog"` modals.
- **Framer Motion** – Smooth page animations, slide transitions, and interactive micro-animations.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.2 |
| Routing | React Router 7 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Date Utils | date-fns 4 |
| Build Tool | Vite 7 |
| Persistence | localStorage |

---

## 📁 Folder Structure

```
skyline-galleria/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Countdown.tsx      # Live countdown timer
│   │   ├── EventCard.tsx      # Event card with RSVP
│   │   ├── Footer.tsx         # Site footer
│   │   ├── HeroSlider.tsx     # Auto-play hero carousel
│   │   ├── Modal.tsx          # Accessible modal dialog
│   │   ├── Navbar.tsx         # Responsive navigation bar
│   │   ├── StoreCard.tsx      # Store card with favourite toggle
│   │   └── ThemeToggle.tsx    # Light/dark mode button
│   ├── data/
│   │   ├── events.ts          # Event mock data & types
│   │   └── stores.ts          # Store mock data & types
│   ├── hooks/
│   │   ├── useAuth.tsx        # Auth context + provider
│   │   ├── useFavorites.tsx   # Favourites context + provider
│   │   └── useTheme.ts        # Theme management hook
│   ├── routes/
│   │   ├── Account.tsx        # User account dashboard
│   │   ├── Contact.tsx        # Contact form page
│   │   ├── Directory.tsx      # Searchable store directory
│   │   ├── Events.tsx         # Events listing with countdown
│   │   ├── Home.tsx           # Landing page
│   │   ├── NotFound.tsx       # 404 page
│   │   ├── Parking.tsx        # Live parking availability
│   │   └── StoreDetails.tsx   # Individual store page
│   ├── App.tsx                # Root component + routing
│   ├── index.css              # Tailwind v4 theme & global styles
│   └── main.tsx               # React DOM entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** ≥ 9 (or pnpm / yarn)

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production bundle will be output to `dist/`.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

### Option 1 – Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel
```

Or connect your GitHub repository on **[vercel.com](https://vercel.com)** for automatic deployments on every push.

**Build Settings:**
| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

### Option 2 – Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or drag & drop your `dist/` folder at **[app.netlify.com](https://app.netlify.com)**.

Create a `netlify.toml` in the project root for SPA redirects:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3 – GitHub Pages

Add this to `vite.config.ts` (replace `your-repo-name`):

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

Then push to GitHub and enable Pages from the **Settings → Pages** tab, selecting the `dist` folder or using a GitHub Actions workflow.

---

## 📦 Initialize Your Git Repository

```bash
# Navigate to the project directory
cd "path/to/Skyline Galleria"

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial production-ready Skyline Galleria website"

# Create repo on GitHub (via GitHub CLI)
gh repo create skyline-galleria --public --push --source=.

# Or manually add your remote:
# git remote add origin https://github.com/YOUR_USERNAME/skyline-galleria.git
# git branch -M main
# git push -u origin main
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint with zero-warning mode |
| `npm run typecheck` | Run TypeScript type check without emitting |

---

## ✅ Production Checklist

- [x] No TypeScript errors (`npm run typecheck`)
- [x] No broken routes
- [x] No console.log statements in source
- [x] All images have `alt` text
- [x] Accessible ARIA attributes throughout
- [x] Dark mode and light mode both work
- [x] Responsive on mobile, tablet, and desktop
- [x] LocalStorage keys scoped (`sg_user`, `sg_favorites`, `sg_theme`)
- [x] SEO meta tags in `index.html`
- [x] Production build generates without errors

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using React, TypeScript, and Tailwind CSS
</p>
