# Deployment Guide — Noel Futkeu Platform

## Prerequisites
Node.js 18+ and npm installed on your machine.

## Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev
# Opens at http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Vercel Deployment (Recommended)

1. Push repo to GitHub
2. Connect to [vercel.com](https://vercel.com)
3. Import the repository
4. Deploy — zero config needed

```bash
# Or via CLI
npx vercel deploy --prod
```

## Environment Variables (Phase 2)
Create `.env.local`:
```
NEXT_PUBLIC_AI_API_KEY=your_openai_or_anthropic_key
NEXT_PUBLIC_STATS_API_URL=your_opta_or_wyscout_endpoint
DATABASE_URL=your_neon_postgres_connection_string
```

## Tech Stack
- **Framework:** Next.js 14.2 (App Router, SSG)
- **Styling:** Tailwind CSS v3 + Custom CSS Variables
- **Animation:** CSS animations + Framer Motion
- **Fonts:** Inter via Google Fonts CDN
- **Build:** ~107KB first load JS — production optimized

## MaxPromo Digital
Platform built by MaxPromo Digital — maxpromo.digital
