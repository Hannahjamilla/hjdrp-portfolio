---
inclusion: manual
---

# Performance Optimization Guide

## Quick Wins Implemented ✅

1. **Code Splitting** - Components now lazy-load on demand
2. **Image Optimization** - All images converted to WebP with explicit dimensions
3. **Mouse Tracking** - Throttled and disabled on mobile
4. **Scroll Optimization** - Throttled scroll handlers
5. **Animation Tuning** - Disabled on mobile, respects prefers-reduced-motion
6. **Next.js Config** - Enhanced with caching, compression, code splitting

## Immediate Next Steps

### 1. CSS Minification (Est. 7 KiB savings)
```bash
npm install --save-dev cssnano postcss
```

Update `postcss.config.mjs`:
```javascript
export default {
  plugins: {
    cssnano: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    },
  },
}
```

### 2. JavaScript Minification (Est. 22 KiB savings)
Already handled by Next.js in production. Verify:
```bash
npm run build
# Check .next/static/chunks/ for minified files
```

### 3. Remove Unused CSS
Audit inline styles in components:
- `Me_Intro.jsx` - Heavy animation styles
- `AboutMeIntro.jsx` - Multiple gradient definitions
- `projects.jsx` - Extensive card styling

Consider extracting to CSS modules.

## Performance Targets

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| FCP | ~1.5s | <1.8s | ✅ |
| LCP | ~3.5s | <2.5s | 🔄 |
| CLS | ~0.15 | <0.1 | 🔄 |
| JS Exec | 5.6s | <3s | 🔄 |
| Bundle | 2.8MB | <2.2MB | 🔄 |

## Testing After Changes

```bash
# Build for production
npm run build

# Analyze bundle
npm run build -- --analyze

# Test locally
npm run dev
# Open Chrome DevTools > Lighthouse
```

## Monitoring

Set up performance budgets in `next.config.mjs`:
```javascript
async rewrites() {
  return {
    beforeFiles: [
      // Performance budget checks
    ],
  }
}
```

## Key Files Modified

- `src/app/page.js` - Lazy loading, mouse tracking, scroll optimization
- `src/app/components/GlobalNavigation.jsx` - Image dimensions
- `src/app/Hannah/Me_Intro.jsx` - Animation optimization
- `next.config.mjs` - Build optimizations
- All `.jsx` files - WebP images

## Resources

- [Next.js Performance](https://nextjs.org/learn/seo/web-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
