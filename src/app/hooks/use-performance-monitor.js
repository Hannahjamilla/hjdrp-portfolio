import { useEffect } from 'react'

export function usePerformanceMonitor(componentName) {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // Log if component takes more than 100ms to render
      if (duration > 100) {
        console.warn(`[Performance] ${componentName} took ${duration.toFixed(2)}ms to render`)
      }
    }
  }, [componentName])
}

export function useImageOptimization() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/images/Hannah.webp',
      '/images/hannah-two.webp',
      '/images/HanMade.webp'
    ]

    preloadImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])
}
