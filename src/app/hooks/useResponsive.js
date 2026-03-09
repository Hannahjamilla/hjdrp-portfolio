'use client'

import { useState, useEffect, useCallback } from 'react'

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    let timeoutId = null
    
    const handleResize = () => {
      // Debounce resize events for better performance - increased delay for mobile
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }, window.innerWidth < 768 ? 300 : 150) // Longer delay on mobile
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Memoize responsive values to prevent unnecessary recalculations
  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024
  const isDesktop = windowSize.width >= 1024
  const isLandscape = windowSize.width > windowSize.height

  const getResponsiveValue = useCallback((desktop, tablet, mobile) => {
    if (isMobile) return mobile
    if (isTablet) return tablet
    return desktop
  }, [isMobile, isTablet])

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    getResponsiveValue,
    width: windowSize.width,
    height: windowSize.height
  }
}
