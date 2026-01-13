# Developer Portfolio — Next.js + Three.js

A minimalist, developer-focused portfolio website featuring:
- **Commit Flow Field**: Three.js particle system representing GitHub commits
- **Live GitHub Integration**: Real-time stats, repos, and contribution data
- **Smooth Scrolling**: Lenis-powered smooth scroll experience
- **Framer Motion**: Sophisticated animations and micro-interactions
- **Performance Optimized**: Lazy loading, 60fps animations, mobile-responsive

## 🎯 Design Philosophy

This portfolio embodies engineering principles:
- **Precise**: Every animation runs at 60fps, every layout is intentional
- **Thoughtful**: GitHub activity is visualized meaningfully, not decoratively
- **Technically Elegant**: Built with production-grade patterns and performance in mind

Inspired by: GitHub Skyline, Linear, Vercel, and high-end developer tools.

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (minimal utility usage)
- **Three.js** via `@react-three/fiber`
- **@react-three/drei**
- **Framer Motion**
- **Lenis** (smooth scrolling)
- **GitHub REST API**

## 📁 Project Structure

```
dev-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles + noise texture
├── components/
│   ├── CommitFlowField.tsx # Three.js particle visualization
│   ├── Hero.tsx            # Hero section with canvas
│   ├── GitHubStats.tsx     # Stats with animated counters
│   ├── Projects.tsx        # Featured projects grid
│   ├── Philosophy.tsx      # Engineering principles
│   ├── Contact.tsx         # Contact section
│   └── SmoothScroll.tsx    # Lenis wrapper
├── lib/
│   ├── github.ts           # GitHub API integration
│   └── useLenis.ts         # Smooth scroll hook
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure GitHub Integration

Open `lib/github.ts` and update the GitHub username:

```typescript
const USERNAME = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
```

### 3. Customize Content

**Hero Section** (`components/Hero.tsx`):
- Update your name
- Update title/description

**Contact Section** (`components/Contact.tsx`):
- Update email address
- Update GitHub link

**Philosophy Section** (`components/Philosophy.tsx`):
- Customize engineering principles to reflect your values

**Metadata** (`app/layout.tsx`):
- Update SEO metadata
- Update OpenGraph tags

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## 🎨 Three.js Commit Flow Field

The particle system represents your GitHub activity:

- **Particle Count**: Scales with total contributions (300-1200 particles)
- **Flow Pattern**: Perlin-like noise creates organic movement
- **Mouse Interaction**: Particles gently avoid cursor
- **Performance**: 60fps with automatic pause when offscreen

**Customization** (`components/CommitFlowField.tsx`):
- Adjust `particleCount` calculation for density
- Modify `noiseScale` for flow speed
- Change colors in `PointMaterial`
- Tweak `mouseInfluence` for interaction strength

## 📊 GitHub API Integration

The portfolio fetches real data from GitHub:

- **User Stats**: Total commits, stars, repos, contribution years
- **Top Languages**: Sorted by repo count
- **Featured Repos**: Sorted by stars or recent activity
- **Caching**: Data revalidates every hour (3600s)

**Using GitHub GraphQL for Real Contributions**:

The current implementation uses mock data. For real contribution graphs:

1. Get a GitHub Personal Access Token
2. Use GitHub GraphQL API
3. Query `contributionsCollection`
4. Pass real data to `CommitFlowField`

Example GraphQL query:
```graphql
{
  user(login: "username") {
    contributionsCollection(from: "2024-01-01T00:00:00Z") {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
```

## 🎭 Animation Principles

All animations follow strict rules:
- **60fps always**: No jank, no dropped frames
- **Damping & easing**: Smooth, natural motion
- **8-12 second loops**: Nothing too fast or jarring
- **Intentional motion**: Every animation has purpose

**Framer Motion Patterns**:
- Staggered reveals with `delay`
- `useInView` for scroll-triggered animations
- `whileHover` for subtle interactions
- `cubic-bezier` easing: `[0.4, 0, 0.2, 1]`

## 🎨 Styling System

**Color Palette**:
```css
--gh-green: #2ea043         /* GitHub green accent */
--deep-charcoal: #0d1117    /* Background */
--charcoal: #161b22         /* Sections */
--charcoal-light: #21262d   /* Cards */
--charcoal-lighter: #30363d /* Borders */
```

**Typography**:
- **Display**: Space Grotesk (headings)
- **Monospace**: JetBrains Mono (stats, code)
- **Body**: System sans-serif

**Design Elements**:
- Subtle noise texture overlay (3% opacity)
- Grid system (50px squares, 3% opacity)
- Glow effects on hover (GitHub green)
- Gradient overlays for depth

## ♿️ Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support (respects `prefers-reduced-motion`)
- Mobile-safe Three.js fallback (static gradient)

## 🚀 Performance Optimizations

1. **Three.js Lazy Loading**: Canvas only loads when needed
2. **Intersection Observer**: Pause canvas when offscreen
3. **Image Optimization**: Next.js Image component
4. **Server-Side Fetching**: GitHub data fetched at build time
5. **Revalidation**: 1-hour cache prevents API rate limits

## 📱 Mobile Considerations

The portfolio is fully responsive:
- Three.js canvas scales to viewport
- Touch-friendly interactions
- Smooth scroll disabled on mobile (native scroll)
- Stacked layouts for narrow screens

## 🔒 Environment Variables (Optional)

For GitHub API rate limits, add a Personal Access Token:

```env
GITHUB_TOKEN=your_token_here
```

Update `lib/github.ts`:
```typescript
headers: {
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
}
```

## 🐛 Troubleshooting

**Three.js canvas not rendering**:
- Check browser console for WebGL errors
- Ensure `@react-three/fiber` and `three` versions match
- Try disabling browser extensions

**GitHub API rate limit**:
- Add `GITHUB_TOKEN` environment variable
- Reduce `revalidate` time in `app/page.tsx`
- Use mock data for development

**Animations stuttering**:
- Check for expensive re-renders
- Use Chrome DevTools Performance tab
- Ensure 60fps in Three.js canvas

## 📄 License

MIT — Feel free to use this as a template for your own portfolio!

## 🤝 Credits

Design inspired by:
- GitHub Skyline
- Linear's design system
- Vercel's developer aesthetics
- Modern dev tools (Cursor, Raycast)

Built with precision and care for the craft of engineering.
