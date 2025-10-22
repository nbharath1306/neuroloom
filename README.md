# 🚀 NeuroLoom - Your Daily Tech & AI News Hub

**Stop doom scrolling on Instagram!** NeuroLoom is a beautiful cyberpunk-themed web app that aggregates the latest AI and tech news from 10 top sources. Just bookmark it and visit once daily for your curated news fix.

## 🌐 **Live Demo**
### **[➡️ Visit NeuroLoom](https://neuroloom-orpin.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Features

- 📰 **10 Premium Sources**: TechCrunch, AI News, MIT Tech Review, Wired, Economic Times, Indian Express, Mint, Express Computer, Analytics India Magazine, The Verge
- 🎨 **Cyberpunk UI**: Neon cyan/magenta/yellow theme, scanline effects, glitch animations, glassmorphism
- ⚡ **Smooth Animations**: Entrance animations, hover effects, cascading card reveals
- 🔍 **Search & Filter**: Find exactly what you need with powerful search and source filtering
- � **Creator Profile**: Stunning floating profile with scroll-aware behavior - appears at top, disappears when scrolling
- �📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile
- 🔄 **Real-time Updates**: Fresh content every time you visit
- 🎯 **No Distractions**: Clean, focused interface - no ads, no tracking, no cookies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A profile image (optional - for the floating profile feature)

### 1. Clone the Repository
```bash
git clone https://github.com/nbharath1306/neuroloom.git
cd neuroloom
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Your Profile Image (Optional)
If you want to customize the floating profile with your own image:
- Place your profile image as `public/profile.jpg`
- Or update the image path in `app/components/FloatingProfile.tsx`

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! 🎉

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **RSS Parsing**: rss-parser
- **Deployment**: Vercel (recommended)

## 🎯 Usage

1. **Browse News**: Scroll through the latest articles from all sources
2. **Filter by Source**: Click on source pills to filter by specific outlets
3. **Search**: Use the search bar to find articles on specific topics
4. **Refresh**: Click the refresh button to fetch the latest updates
5. **Read**: Click any article card to read the full story

## 📂 Project Structure

\`\`\`
NeuroLoom/
├── app/
│   ├── api/
│   │   └── news/
│   │       └── route.ts          # RSS feed aggregation API
│   ├── components/
│   │   ├── NewsCard.tsx          # Individual news card component
│   │   ├── FilterBar.tsx         # Search and filter component
│   │   ├── FloatingProfile.tsx   # Creator profile with scroll awareness
│   │   └── ThemeSwitcher.tsx     # Dark/Light mode toggle
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles with animations
├── public/
│   └── profile.jpg               # Profile image (customize with yours!)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## 🌟 Key Components

### FloatingProfile
Stunning creator profile that:
- Appears in top-left corner when at page top
- Smoothly disappears when scrolling down (past 100px)
- 300ms hover delay to prevent accidental expansion
- Features: Particle effects, gradient borders, social links (LinkedIn, Instagram, GitHub, X)
- Fully customizable - replace `public/profile.jpg` with your image

### NewsCard
Displays individual news articles with:
- Source badge with color coding
- Relative timestamps (e.g., "2h ago")
- Article title and snippet
- Categories/tags
- Hover effects and transitions

### FilterBar
Provides:
- Real-time search across titles and content
- Source filtering with pill buttons
- Refresh button to fetch latest news

### News API
- Fetches from 10 RSS feeds in parallel
- Parses and normalizes data
- Sorts by publication date
- Returns JSON response

## 🎨 Customization

### Customize the Floating Profile
Edit `app/components/FloatingProfile.tsx`:

```typescript
// Change your name
<h3>Your Name</h3>

// Update social links
const socials = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile/', ... },
  { name: 'Instagram', url: 'https://instagram.com/yourhandle/', ... },
  // ... etc
];

// Replace profile image
// Just add your image as public/profile.jpg
```

### Add More Sources
Edit `app/api/news/route.ts`:

\`\`\`typescript
const RSS_FEEDS = [
  { url: 'https://your-feed-url.com/rss', source: 'Your Source Name' },
  // Add more feeds here
];
\`\`\`

### Change Color Scheme
Edit `tailwind.config.js` and `app/components/NewsCard.tsx` for source colors.

### Modify Layout
Update `app/page.tsx` to change the hero section, features, or layout.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Done! Your site will be live at `your-project.vercel.app`

### Alternative: Deploy to Netlify

\`\`\`bash
npm run build
\`\`\`

Upload the `.next` folder to Netlify.

## 📱 Bookmark Instructions

### Desktop (Chrome/Safari/Firefox)
1. Visit your deployed site
2. Press `Ctrl+D` (Windows/Linux) or `Cmd+D` (Mac)
3. Save to bookmarks bar

### Mobile (iOS/Android)
1. Open the site in Safari/Chrome
2. Tap the share button
3. Select "Add to Home Screen"
4. Access it like a native app!

## 🔧 Troubleshooting

### RSS Feed Errors
Some feeds may have CORS restrictions. The Next.js API route handles this by fetching server-side.

### Slow Loading
- RSS feeds can be slow to respond
- Consider implementing caching in the future
- Some sources may be temporarily unavailable

## 🎯 Recommended Usage

**Set a Daily Routine:**
- Morning: Open NeuroLoom with your coffee ☕
- Spend 10-15 minutes catching up on tech & AI news
- Close the tab and get on with your day
- **No more doom scrolling!**

**Pro Tip**: Set NeuroLoom as your browser's new tab page or bookmark it for easy daily access! 🎯

## 📝 Future Enhancements

- [ ] Add Redis caching to improve load times
- [ ] Implement infinite scroll / pagination
- [ ] Save favorite articles (local storage)
- [ ] Share articles on social media
- [ ] PWA support for offline access
- [ ] Email digest option (daily/weekly summaries)
- [ ] More RSS sources and categories

## 🤝 Contributing

Want to add more sources or features? Feel free to fork and submit a PR!

## 📄 License

MIT License - feel free to use this project however you want!

## 💜 Made With

Built with ❤️ to beat Instagram doom scrolling addiction!

---

## 🔗 Links

- **Live Site**: [neuroloom-orpin.vercel.app](https://neuroloom-orpin.vercel.app)
- **GitHub**: [github.com/nbharath1306/neuroloom](https://github.com/nbharath1306/neuroloom)

---

**NeuroLoom © 2025** | Built by [Bharath](https://github.com/nbharath1306)
