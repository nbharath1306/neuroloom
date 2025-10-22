# 🚀 NeuroLoom - Quick Start

## What You Got

A **futuristic AI & tech news aggregator** that pulls from 10 premium sources:
- TechCrunch
- AI News
- MIT AI Lab
- Wired AI
- Economic Times
- Indian Express
- Mint
- Express Computer
- Analytics India
- The Verge

## Features ✨

### Design
- 🎨 Futuristic glassmorphism UI
- ✨ Neon glow effects
- 🌊 Animated gradient background
- ⭐ Floating particle effects
- 🎯 Smooth hover animations
- 📱 Fully responsive (mobile/tablet/desktop)

### Functionality
- 🔍 Real-time search across all articles
- 🏷️ Filter by source
- 🔄 One-click refresh
- ⚡ Fast RSS aggregation
- 🎨 Color-coded sources
- 🔗 Direct links to full articles

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## File Structure

```
ai-pulse/
├── app/
│   ├── api/news/route.ts        # RSS feed aggregator
│   ├── components/
│   │   ├── NewsCard.tsx         # Individual news cards
│   │   └── FilterBar.tsx        # Search & filter UI
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles + animations
├── package.json
├── tailwind.config.js           # Tailwind + animations
├── next.config.js
├── README.md                    # Full documentation
└── DEPLOYMENT.md                # Deployment guide
```

## Ready to Deploy? 🚀

### Fastest Way (1 minute):

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "AI Pulse v1.0"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repo
   - Click "Deploy"
   - Done! ✅

3. **Your site is live!** 🎉

## Usage

1. **Bookmark** `http://localhost:3000` (or your deployed URL)
2. **Visit once daily** instead of Instagram
3. **Search** for topics you care about
4. **Filter** by your favorite sources
5. **Click** any card to read the full article

## Customization

### Add More RSS Feeds
Edit `app/api/news/route.ts`:
```typescript
const RSS_FEEDS = [
  { url: 'YOUR_RSS_URL', source: 'SOURCE_NAME' },
  // ...
];
```

### Change Colors
Edit `tailwind.config.js` and `app/globals.css`

### Modify Layout
Edit `app/page.tsx`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **RSS Parser**: rss-parser
- **Deployment**: Vercel (recommended)

## Performance

- ⚡ Server-side rendering
- 🚀 Parallel feed fetching
- 📦 Optimized bundles
- 🎯 Minimal dependencies

## Browser Support

- Chrome ✅
- Safari ✅
- Firefox ✅
- Edge ✅
- Mobile browsers ✅

## Need Help?

Check `DEPLOYMENT.md` for the complete deployment guide!

---

**Made with 💜 to beat Instagram doom scrolling!**

**NeuroLoom © 2025**
